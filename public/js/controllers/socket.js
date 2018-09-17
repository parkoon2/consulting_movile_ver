
const SocketController = (() => {
    function SocketController() { }

    let _prototype = SocketController.prototype;
    _prototype.eventHandler = (msg) => {
        try {
            const op = msg.eventOp ||  msg.signalOp
            window.Logger.success(`[Message] Signal --> App ${op}`, msg)
            if (!op) throw 'Event message error'
            
            switch (op) {
                case 'Login':
                LoginController.loginProcess(msg)
                break

                case 'Invite':
                ConsultingController.inviteProcess(msg)
                break

                case 'Join':
                ConsultingController.joinProcess(msg)
                break

                case 'Candidate':
                ConsultingController.cadidateProcess(msg)
                break

                case 'SDP':
                ConsultingController.sdpProcess(msg)
                break;
            }

        } catch (err) {
            window.Logger.fail(err)
        }
    }
    return new SocketController();
})()
