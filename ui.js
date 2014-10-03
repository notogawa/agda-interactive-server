$(document).ready(function() {
    var editor = ace.edit("agda_buffer");
    editor.commands.addCommand({
        name: 'agda-input-trans',
        bindKey: {win: '\\',  mac: '\\'},
        exec: function(editor) {
            // TODO: open window & translate & insert char
            console.log(translation('eqn'));
        },
        readOnly: true // false if this command should not apply in readOnly mode
    });
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
        function (highlights) {
            var source = editor.getValue();
            var pos = 0;
            var hs = [];
            $.extend(true, hs, highlights);
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
                            if (code.match(/^\s*\?\s*$/)) { span.addClass('UnsolvedMeta'); }
                            ace_line.append(span);
                            cur = from;
                        }
                        if (cur < to) {
                            to = pos + t.length < to ? pos + t.length : to;
                            var span = $('<span>');
                            var code = source.substring(cur, to);
                            span.append(code);
                            span.addClass(highlight.meta.aspect);
                            if (code.match(/^\s*\?\s*$/)) { span.addClass('UnsolvedMeta'); }
                            ace_line.append(span);
                            cur = to;
                        }
                    }
                });
                var span = $('<span>');
                var code = source.substring(cur, pos + t.length);
                span.append(code);
                if (code.match(/^\s*\?\s*$/)) { span.addClass('UnsolvedMeta'); }
                ace_line.append(span);
                pos = pos + t.length + 1;
            });
        }
    );
    editor.on('change', function (e) {
        return agda.sendLoad(editor.getValue()); // TODO: イマイチだな？
    });
    $('#agda_buffer_save').click(function () {
        return window.localStorage.setItem("agda_buffer", editor.getValue());
    });
    $('#agda_buffer_load').click(function () {
        editor.setValue(window.localStorage.getItem("agda_buffer"));
        return agda.sendLoad(editor.getValue());
    });
    $('#agda_command_reload').click(function () {
        return agda.sendLoad(editor.getValue());
    });
    $('#agda_command_metas').click(function () {
        return agda.sendMetas();
    });
    $('#agda_command_give').click(function () {
        return agda.sendGive(
            $('#agda_command_args_meta').val(),
            $('#agda_command_args_expr').val()
        );
    });
    $('#agda_command_solveAll').click(function () {
        return agda.sendSolveAll();
    });
    $('#agda_command_constraints').click(function () {
        return agda.sendConstraints();
    });
});
