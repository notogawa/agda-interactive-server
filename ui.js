var f = function (x) {};

var onOpen = function () {
    return agda.sendLoad(document.getElementById('agda_buffer').innerText);
}

var onError = function (e) {
    console.log(e);
}

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

var onMessage = function (msg) {
    if (msg.type == 'runningInfo') {
        document.getElementById('agda_prompt').innerText += msg.contents.message;
    } else if (msg.type == 'metas') {
        var sel = document.getElementById('agda_command_args_meta');
        for (var i = sel.childNodes.length - 1; i >= 0; i--) {
            sel.removeChild(sel.childNodes[i]);
        }
        for (var i = 0; i < msg.contents.metas.length; i++) {
            var opt = document.createElement('option');
            opt.value = msg.contents.metas[i];
            opt.innerText = msg.contents.metas[i];
            sel.appendChild(opt);
        }
    } else if (msg.type == 'highlight') {
        highlights = mergeHighlights(highlights, msg.contents);
        var buf = document.getElementById('agda_buffer');
        var source = buf.innerText;
        for (var i = buf.childNodes.length - 1; i >= 0; i--) {
            buf.removeChild(buf.childNodes[i]);
        }
        var cur = 0;
        for (var i = 0; i < highlights.length; i++) {
            if (cur < highlights[i].range.from-1) {
                var span = document.createElement('span');
                span.innerText = source.substring(cur, highlights[i].range.from-1);
                buf.appendChild(span);
                cur = highlights[i].range.from-1;
            }
            if (cur < highlights[i].range.to-1) {
                var span = document.createElement('span');
                span.innerText = source.substring(cur, highlights[i].range.to-1);
                span.className = highlights[i].meta.aspect;
                buf.appendChild(span);
                cur = highlights[i].range.to-1;
            }
        }
        var span = document.createElement('span');
        span.innerText = source.substring(cur, source.length);
        buf.appendChild(span);
        cur = source.substring(cur, source.length);
    }
};

var proto = (location.protocol == 'http:') ? 'ws://' : 'wss://';
var agda = new Agda(proto+location.host, onOpen, onError, onMessage);

document.getElementById('agda_command_reload').onclick = function () {
    return agda.sendLoad(document.getElementById('agda_buffer').innerText);
}
document.getElementById('agda_command_metas').onclick = function () {
    return agda.sendMetas();
}
document.getElementById('agda_command_give').onclick = function () {
    return agda.sendGive(
        document.getElementById('agda_command_args_meta').value,
        document.getElementById('agda_command_args_expr').value
    );
}
document.getElementById('agda_command_solveAll').onclick = function () {
    return agda.sendSolveAll();
}
document.getElementById('agda_command_constraints').onclick = function () {
    return agda.sendConstraints();
}
