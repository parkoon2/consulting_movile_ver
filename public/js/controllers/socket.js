
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
                    break

                case 'Draw':
                    WhiteboardController.doDrawing(msg)
                    break

                case 'FileShareSvr':
                    WhiteboardController.drawImagefile(msg)
                    break

                case 'ScreenShare':
                    ConsultingController.startP2PScreenshare(msg)
                    break

                case 'FriendList':
                    FriendsController.handleFriendList(msg, () => {
                        FriendsController.createFriendDOM()
                        FriendsController.requestCompanies()
                    })
                    break

                case 'SingleAddressInfo':
                    FriendsController.handleCompanyList(msg, () => {
                        FriendsController.createCompanyDOM(() => {
                            LoginController.hide()
                            MainController.showMainPage()
                        })
                    })
                    break

                case 'Presence':
                    ConsultingController.handlePresence(msg)
                    break
                case 'Call':
                    ConsultingController.handleCallRespose(msg)
                    break
                case 'ExitRoom':
                    ConsultingController.handleExitroomResponse(msg)
                    break
                case 'LineSize':
                    WhiteboardController.setThickness(msg)
                    break

                case 'Color':
                    WhiteboardController.setColor(msg)
                    break

                case 'Erase':
                    WhiteboardController.doErasing(msg)
                    break

                case 'EraserSize':
                    WhiteboardController.setEraserSize(msg)
                    break
            }

        } catch (err) {
            window.Logger.fail(err)
        }
    }
    return new SocketController();
})()
