var f = function (x) {};

var onOpen = function () {
    return agda.sendLoad(document.getElementById('agda_buffer').innerText);
}

var onError = function (e) {
    console.log(e);
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
