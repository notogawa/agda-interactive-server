var Agda = (function () {
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

    function Agda (remoteHost, onOpen, onError,
                   onRunningInfo, onDisplayInfo, onMetas, onGiveResult,
                   onHighlight) {
        this._debug = (typeof debug === 'undefined') ? false : true;
        try {
            this._connection = new WebSocket(remoteHost);
        } catch (err) {
            console.error(err);
        }
        this._connection.onopen = onOpen;
        this._connection.onerror = onError;
        this._onRunningInfo = onRunningInfo;
        this._onDisplayInfo = onDisplayInfo;
        this._onMetas = onMetas;
        this._onHighlight = onHighlight;
        this._connection.onmessage = function (msgData) {
            var msg = JSON.parse(msgData.data);
            if (msg.type == 'runningInfo') {
                return onRunningInfo(msg.contents);
            } else if (msg.type == 'displayInfo') {
                return onDisplayInfo(msg.contents);
            } else if (msg.type == 'metas') {
                return onMetas(msg.contents);
            } else if (msg.type == 'give') {
                return onGiveResult(msg.contents);
            } else if (msg.type == 'highlight') {
                highlights = mergeHighlights(highlights, msg.contents);
                return onHighlight(highlights);
            }
        }
    }
    function sendLoad (source) {
        highlights = [];
        var msg = {};
        msg.type = 'load';
        msg.contents = {}
        msg.contents.source = source;
        this._connection.send(JSON.stringify(msg));
    }
    function sendConstraints () {
        var msg = {};
        msg.type = 'constraints';
        this._connection.send(JSON.stringify(msg));
    }
    function sendSolveAll () {
        var msg = {};
        msg.type = 'solveAll';
        this._connection.send(JSON.stringify(msg));
    }
    function sendGive (meta, expr) {
        var msg = {};
        msg.type = 'give';
        msg.contents = {};
        msg.contents.meta = parseInt(meta, 10);
        msg.contents.expr = expr;
        this._connection.send(JSON.stringify(msg));
    }
    function sendRefine (meta, expr) {
        var msg = {};
        msg.type = 'refine';
        msg.contents = {};
        msg.contents.meta = parseInt(meta, 10);
        msg.contents.expr = expr;
        this._connection.send(JSON.stringify(msg));
    }
    function sendMetas () {
        var msg = {};
        msg.type = 'metas';
        this._connection.send(JSON.stringify(msg));
    }
    function sendAuto (meta, expr) {
        var msg = {};
        msg.type = 'auto';
        msg.contents = {};
        msg.contents.meta = parseInt(meta, 10);
        msg.contents.expr = expr;
        this._connection.send(JSON.stringify(msg));
    }
    function highlight() {
        return this._onHighlight(highlights);
    }

    Agda.prototype = {
        constructor: Agda,
        sendLoad: sendLoad,
        sendConstraints: sendConstraints,
        sendSolveAll: sendSolveAll,
        sendGive: sendGive,
        sendRefine: sendRefine,
        sendMetas: sendMetas,
        sendAuto: sendAuto,
        highlight: highlight
    };

    return Agda;
} () );
