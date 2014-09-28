$(document).ready(function() {
    var editor = ace.edit("agda_buffer");
    var agda = new Agda(
        ((location.protocol == 'http:') ? 'ws://' : 'wss://') + location.host,
        function () {
            return agda.sendLoad(editor.getValue());
        },
        function (e) {
            console.log(e);
        },
        function (msg) {
            $('#agda_prompt').append(msg.information);
        },
        function (msg) {
            $('#agda_prompt').append(msg.information + "\n");
        },
        function (msg) {
            var sel = $('#agda_command_args_meta');
            sel.empty();
            msg.metas.forEach(function (meta) {
                var opt = $('<option>');
                opt.attr('value', meta);
                opt.append(meta);
                sel.append(opt);
            });
        },
        function (highlights) { // TODO: 高速化
            var source = editor.getValue();
            console.log
            var pos = 0;
            $('.ace_line').map(function () {return $(this);}).get().forEach(function (ace_line) {
                var t = ace_line.text();
                ace_line.empty();
                var cur = pos;
                var hs = undefined;
                $.extend(true, highlights, hs);
                highlights.forEach(function (highlight) {
                    var from = highlight.range.from - 1;
                    if (cur < from) {
                        var span = $('<span>');
                        span.append(source.substring(cur, from));
                        ace_line.append(span);
                        cur = from;
                    }
                    var to = highlight.range.to - 1;
                    if (cur < to) {
                        var span = $('<span>');
                        span.append(source.substring(cur, to));
                        span.addClass(highlight.meta.aspect);
                        ace_line.append(span);
                        cur = to;
                    }
                });
                var span = $('<span>');
                span.append(source.substring(cur, pos + t.length));
                ace_line.append(span);
                pos = pos + t.length;
            });
        }
    );
    editor.on('change', function (e) {
        return agda.sendLoad(editor.getValue()); // TODO: イマイチだな？
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
