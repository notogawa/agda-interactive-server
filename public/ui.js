$(document).ready(function() {
    var editor = ace.edit("agda_buffer");
    // editor.setOptions({
    //     fontFamily: "DejaVu Sans Mono",
    //     fontSize: "10pt"
    // });
    editor.commands.addCommand({
        name: 'agda-input-trans',
        bindKey: {win: '\\',  mac: '\\'},
        exec: function(editor) {
            var cursor = $('.ace_cursor').offset();
            var im = $('#agda_input');
            im.css('left', cursor.left);
            im.css('top', cursor.top);
            im.val('');
            im.show();
            im.focus();
        },
        readOnly: true
    });
    var metas = [];
    var agda = new Agda(
        ((location.protocol == 'http:') ? 'ws://' : 'wss://') + location.host,
        function () {
            return agda.sendLoad(editor.getValue());
        },
        function (e) {
            console.log(e);
        },
        function (msg) {
            var prompt = $('#agda_running_prompt');
            prompt.append(msg.information);
            prompt.scrollTop(prompt.prop('scrollHeight'));
        },
        function (msg) {
            var prompt = $('#agda_display_prompt');
            prompt.empty();
            prompt.append(msg.information + "\n");
            prompt.scrollTop(prompt.prop('scrollHeight'));
        },
        function (msg) {
            var sel = $('#agda_command_args_meta');
            sel.empty();
            if (msg.metas.length == 0) {
                sel.css('display', 'none');
            } else {
                msg.metas.forEach(function (meta) {
                    var opt = $('<option>');
                    opt.attr('value', meta);
                    opt.append('?'+meta);
                    sel.append(opt);
                });
                sel.css('display', 'inline');
            }
        },
        function (msg) {
            editor.remove('?');
            editor.insert(msg.result);
        },
        function (msg) {
            editor.removeToLineEnd();
            editor.removeToLineStart();
            msg.result.forEach(function (x) { editor.insert(x+"\n"); });
        },
        function (highlights) {
            var source = editor.getValue();
            var pos = 0;
            var hs = [];
            metas = [];
            $.extend(true, hs, highlights);
            var startLine = $('.ace_gutter-cell').text()[0];
            skipSource = source.split(/\n/).slice(0, startLine-1).join('\n');
            if (1 < startLine) pos = skipSource.length + 1;
            $('.ace_line').map(function () {return $(this);}).get().forEach(function (ace_line) {
                var t = ace_line.text();
                ace_line.empty();
                var cur = pos;
                hs.forEach(function (highlight) {
                    var from = highlight.range.from - 1;
                    var to = highlight.range.to - 1;
                    if (to < pos || pos + t.length < from) {
                    } else {
                        if (cur < from) {
                            var span = $('<span>');
                            var code = source.substring(cur, from);
                            span.append(code);
                            if (code.match(/^\s*\?\s*$/)) {
                                metas.push(cur+code.indexOf('?'));
                                span.addClass('UnsolvedMeta');
                            }
                            ace_line.append(span);
                            cur = from;
                        }
                        if (cur < to) {
                            to = pos + t.length < to ? pos + t.length : to;
                            var span = $('<span>');
                            var code = source.substring(cur, to);
                            span.append(code);
                            span.addClass(highlight.meta.aspect);
                            highlight.meta.otherAspects.forEach(function (aspect) {
                                span.addClass(aspect);
                            });
                            if (code.match(/^\s*\?\s*$/)) {
                                metas.push(cur+code.indexOf('?'));
                                span.addClass('UnsolvedMeta');
                            }
                            ace_line.append(span);
                            cur = to;
                        }
                    }
                });
                var span = $('<span>');
                var code = source.substring(cur, pos + t.length);
                span.append(code);
                if (code.match(/^\s*\?\s*$/)) {
                    metas.push(cur+code.indexOf('?'));
                    span.addClass('UnsolvedMeta');
                }
                ace_line.append(span);
                pos = pos + t.length + 1;
            });
        }
    );
    var needReload = false;
    var reloadDelay = 0;
    editor.on('change', function (e) {
        needReload = true;
        reloadDelay = 50;
    });
    $(function(){
        setInterval(function () {
            if (needReload) {
                reloadDelay--;
                if (!reloadDelay) {
                    agda.sendLoad(editor.getValue());
                    needReload = false;
                }
            }
        },10);
    });
    $('#agda_buffer_save').click(function () {
        return window.localStorage.setItem("agda_buffer", editor.getValue());
    });
    $('#agda_buffer_load').click(function () {
        editor.setValue(window.localStorage.getItem("agda_buffer"));
        return agda.sendLoad(editor.getValue());
    });
    $('#agda_command_metas').click(function () {
        return agda.sendMetas();
    });
    $('#agda_command_give').click(function () {
        var pos = editor.getSession().getDocument().indexToPosition(metas[$('#agda_command_args_meta').val()], 0);
        editor.moveCursorToPosition(pos);
        editor.clearSelection();
        return agda.sendGive(
            $('#agda_command_args_meta').val(),
            $('#agda_command_args_expr').val()
        );
    });
    $('#agda_command_refine').click(function () {
        var pos = editor.getSession().getDocument().indexToPosition(metas[$('#agda_command_args_meta').val()], 0);
        editor.moveCursorToPosition(pos);
        editor.clearSelection();
        return agda.sendRefine(
            $('#agda_command_args_meta').val(),
            $('#agda_command_args_expr').val()
        );
    });
    $('#agda_command_case').click(function () {
        var pos = editor.getSession().getDocument().indexToPosition(metas[$('#agda_command_args_meta').val()], 0);
        editor.moveCursorToPosition(pos);
        editor.clearSelection();
        return agda.sendCase(
            $('#agda_command_args_meta').val(),
            $('#agda_command_args_expr').val()
        );
    });
    var input = new Input();
    $("#agda_input").autocomplete({
        source: function (req, resp) { resp(input.translate(req.term)); },
        select: function (event, ui) {
            editor.insert(ui.item.value);
            editor.focus();
            $('#agda_input').hide();
        }
    });
});
