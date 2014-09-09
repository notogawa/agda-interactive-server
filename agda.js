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
        this._connection.onmessage = onMessage;
    }
    function sendSource (source) {
        var msg = {};
        msg.type = 'source';
        msg.body = source;
        this._connection.send(JSON.stringify(msg));
    }
    function sendCommand (cmd) {
        var msg = {};
        msg.type = 'command';
        msg.body = cmd;
        this._connection.send(JSON.stringify(msg));
    }
    function sendQuit () {
        sendCommand.call(this, ':?');
    }
    function sendReload () {
        sendCommand.call(this, ':reload');
    }
    function sendConstraints () {
        sendCommand.call(this, ':constraints');
    }
    function sendContext (meta) {
        sendCommand.call(this, ':Context '+meta);
    }
    function sendGive (meta, expr) {
        sendCommand.call(this, ':give '+meta+' '+expr);
    }
    function sendRefine (meta, expr) {
        sendCommand.call(this, ':Refine '+meta+' '+expr);
    }
    function sendMetas () {
        sendCommand.call(this, ':metas');
    }
    function sendEval (meta, expr) {
        sendCommand.call(this, ':eval '+meta+' '+expr);
    }
    function sendTypeOf () {
        sendCommand.call(this, ':typeOf');
    }
    function sendTypeIn (meta, expr) {
        sendCommand.call(this, ':typeIn '+meta+' '+expr);
    }
    function sendWakeup () {
        sendCommand.call(this, ':wakeup');
    }
    function sendScope () {
        sendCommand.call(this, ':scope');
    }

    Agda.prototype = {
        constructor: Agda,
        sendQuit: sendQuit,
        sendReload: sendReload,
        sendConstraints: sendConstraints,
        sendContext: sendContext,
        sendGive: sendGive,
        sendRefine: sendRefine,
        sendMetas: sendMetas,
        sendEval: sendEval,
        sendTypeOf: sendTypeOf,
        sendTypeIn: sendTypeIn,
        sendWakeup: sendWakeup,
        sendScope: sendScope,
        sendSource: sendSource
    };

    return Agda;
} () );
