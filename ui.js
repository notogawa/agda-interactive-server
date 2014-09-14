$(document).ready(function() {
    var highlights = [];

    var mergeHighlights = function (currentHighlights, updateHighlights) {
        currentHighlights.sort(function (a,b) { return a.range.from - b.range.from; });
        updateHighlights.sort(function (a,b) { return a.range.from - b.range.from; });
        var mergedHighlights = [];
        var ch = currentHighlights.shift();
        var uh = updateHighlights.shift();
        while (ch && uh) {
            if (ch.range.to <= uh.range.from) {
                mergedHighlights.push(ch);
                ch = currentHighlights.shift();
            } else if (uh.range.to <= ch.range.from) {
                mergedHighlights.push(uh);
                uh = updateHighlights.shift();
            } else {
                ch = currentHighlights.shift();
            }
        }
        if (typeof uh === 'undefined') {
            mergedHighlights = mergedHighlights.concat(currentHighlights);
        }
        if (typeof ch === 'undefined') {
            mergedHighlights = mergedHighlights.concat(updateHighlights);
        }
        return mergedHighlights;
    }

    var agda = new Agda(
        ((location.protocol == 'http:') ? 'ws://' : 'wss://') + location.host,
        function () {
            return agda.sendLoad($('#agda_buffer').text());
        },
        function (e) {
            console.log(e);
        },
        function (msg) {
            if (msg.type == 'runningInfo') {
                $('#agda_prompt').append(msg.contents.information);
            } else if (msg.type == 'displayInfo') {
                $('#agda_prompt').append(msg.contents.information + "\n");
            } else if (msg.type == 'metas') {
                var sel = $('#agda_command_args_meta');
                sel.empty();
                msg.contents.metas.forEach(function (meta) {
                    var opt = $('<option>');
                    opt.attr('value', meta);
                    opt.append(meta);
                    sel.append(opt);
                });
            } else if (msg.type == 'highlight') {
                highlights = mergeHighlights(highlights, msg.contents);
                var buf = $('#agda_buffer');
                var source = buf.text().replace(/\r\n?/g,'\n');
                buf.empty();
                var cur = 0;
                highlights.forEach(function (highlight) {
                    var from = highlight.range.from - 1;
                    if (cur < from) {
                        var span = $('<span>');
                        span.append(source.substring(cur, from));
                        buf.append(span);
                        cur = from;
                    }
                    var to = highlight.range.to - 1;
                    if (cur < to) {
                        var span = $('<span>');
                        span.append(source.substring(cur, to));
                        span.addClass(highlight.meta.aspect);
                        buf.append(span);
                        cur = to;
                    }
                });
                var span = $('<span>');
                span.append(source.substring(cur, source.length));
                buf.append(span);
                cur = source.substring(cur, source.length);
            }
        }
    );

    $('#agda_command_reload').click(function () {
        return agda.sendLoad($('#agda_buffer').text());
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
