const Notice = (() => {
    function Notice() {

    }
    
    Notice.prototype.messageToServer = (msg) => {
        const op = msg.eventOp ||  msg.signalOp
        window.Logger.success(`[Message] APP --> SIGNAL ${op}`, msg)
        window.Socket.emit('gigagenie', msg)
    }

    // 나중에 알림창으로 고도화..
    Notice.prototype.alert = (msg) => {
        alert(msg)
    }

    let INSTANCE

    return {
        getInstance: function() {
            if (!INSTANCE) {
                INSTANCE = new Notice()
            }
            return INSTANCE
        }
    }

})()