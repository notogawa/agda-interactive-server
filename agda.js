var Agda = (function () {
    function Agda (remoteHost, onOpen, onError, onMessage) {
        this._debug = (typeof debug === 'undefined') ? false : true;
        try {
            this._connection = new WebSocket(remoteHost);
        } catch (err) {
            console.error(err);
        }
        this._connection.onopen = onOpen;
        this._connection.onerror = onError;
        this._connection.onmessage = function (msg) {
            return onMessage(JSON.parse(msg.data));
        }
    }
    function sendLoad (source) {
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

    Agda.prototype = {
        constructor: Agda,
        sendLoad: sendLoad,
        sendConstraints: sendConstraints,
        sendSolveAll: sendSolveAll,
        sendGive: sendGive,
        sendRefine: sendRefine,
        sendMetas: sendMetas,
        sendAuto: sendAuto
    };

    return Agda;
} () );
