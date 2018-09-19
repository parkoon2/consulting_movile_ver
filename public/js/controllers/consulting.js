const ConsultingController = (() => {
    let self
    function ConsultingController() {
        self = this
        this.configuration = {
            iceServers: [
                {
                    urls: 'turn:106.240.247.44:46000',
                    credential: 'kpoint01',
                    username: 'kpoint'
                }
            ]
        }
    }

    let _prototype = ConsultingController.prototype;
    
    _prototype.inviteProcess = (msg) => {
        let $acceptBtn = $('#accept-btn')
        let $rejectBtn = $('#reject-btn')

        window.Logger.info('inviteProcess')
        MainController.hide()
        _prototype.showVideochat()

        _prototype.hideOptionMenuView()
        _prototype.showConfrimView()

        window.roomId = msg.roomId
        window.targetId = msg.targetId

        $acceptBtn.click(acceptHandler)
        $rejectBtn.click(rejectHandler)
    }

    _prototype.showVideochat = () => {
        let $invitePopup = $('#app-videochat')
        $invitePopup.css('display', 'block')
    }

    _prototype.hideInvitation = () => {
        let $invitePopup = $('#app-videochat')
        $invitePopup.css('display', 'none')
    }

    _prototype.hideConfirmView = () => {
        let $btnGroup = $('#confrim-btn-group')
        let $comment = $('#comment')
        $btnGroup.css('display', 'none')
        $comment.css('display', 'none')
    }

    _prototype.showConfrimView = () => {
        let $btnGroup = $('#confrim-btn-group')
        let $comment = $('#comment')
        $btnGroup.css('display', 'block')
        $comment.css('display', 'block')
    }

    _prototype.showOptionMenuView = () => {
        let $btnGroup = $('#option-btn-group')
        let $comment = $('#confer-menu-group')
        $btnGroup.css('display', 'block')
        $comment.css('display', 'block')
    }

    _prototype.hideOptionMenuView = () => {
        let $btnGroup = $('#option-btn-group')
        let $comment = $('#confer-menu-group')
        $btnGroup.css('display', 'none')
        $comment.css('display', 'none')
    }
     
    _prototype.joinProcess = (msg) => {
        let code = msg.code * 1 || 200

        if (code !== 200) {
            window.Notice.alert('참여할 수 있는 방이 없습니다.')
            _prototype.hideInvitation()
            return
        }
        _prototype.startConsulting({
            hostType: 'caller',
        })
    }

    _prototype.startP2PScreenshare = (msg) => {
        try {

            if (msg.hasOwnProperty('code')) {
                window.Logger.info('Code 처리 부분')
                return
            }

            window.Logger.success('[consulting.js startConsulting] P2P 화면공유 시작')
            window.screenPeer = new RTCPeerConnection(self.configuration)
            window.Logger.success('[consulting.js startConsulting] P2P Screen peer 생성')

            // window.screenPeer.onicecandidate = handleICECandidateEvent
            window.screenPeer.onaddstream = handleVideoAddStreamEvent
        
            // Set offer SDP
            window.screenPeer.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            
            window.screenPeer.createAnswer(function(answerSdp) {
                window.screenPeer.setLocalDescription(new RTCSessionDescription(answerSdp))
                window.Notice.messageToServer({
                    eventOp: 'ScreenShare',
                    sdp: answerSdp,
                    // useMediaSvr: 'N',
                    reqNo: window.DateOfMessage.getReqNo(),
                    reqDate: window.DateOfMessage.getReqDate(),
                    userId: window.userId,
                    roomId: window.roomId,
                    videoMediaStreamId: '',
                    videoTrackId: '',
                })

            }, function (err) {
                throw err
            })

        } catch (err) {
            window.Logger.fail('[consulting.js startP2PScreenshare] ERROR', err)
        }


    }

    _prototype.startConsulting = (opt) => {
        let hostType = opt.hostType // Caller

        window.Logger.success('[consulting.js startConsulting] P2P 화상채팅 시작', hostType)
        window.videoPeer = new RTCPeerConnection(self.configuration)
        window.Logger.success('[consulting.js startConsulting] P2P Video Peer 생성')

        window.videoPeer.onicecandidate = handleICECandidateEvent
        window.videoPeer.onaddstream = handleAddStreamEvent
        try {
            navigator.getUserMedia({video: true, audio: true}, function(stream) {
                window.Logger.success('[consulting.js startConsulting] getUserMedia 성공')
                
                let myVideo = document.getElementById('my-video')
    
                myVideo.srcObject = stream
                myVideo.muted = true
    
                window.videoStream = stream
                window.videoPeer.addStream(stream)
                if (hostType === 'caller') {
                    window.videoPeer.createOffer(function(offerSdp) {
                        window.videoPeer.setLocalDescription(new RTCSessionDescription(offerSdp))
                        window.Notice.messageToServer({
                            eventOp: 'SDP',
                            sdp: offerSdp,
                            // usage: 'cam',
                            useMediaSvr: 'N',
                            userId: window.userId,
                            roomId: window.roomId,            
                            reqNo: window.DateOfMessage.getReqNo(),
                            reqDate: window.DateOfMessage.getReqDate(),
                        })
                    }, function (err) {
                        throw err
                    })
                }
                    
                }, function(err) {
                    throw err;
                }
            );
        } catch (err) {
            window.Logger.fail(err)
        }
    }

    _prototype.cadidateProcess = (msg) => {
        try {
            if (msg.candidate) {
                let candidate = new RTCIceCandidate(msg.candidate)
                window.videoPeer.addIceCandidate(candidate)
                window.Logger.success('[consulting.js cadidateProcess] Cadidate 적용')
            }
        } catch (err) {
            window.Logger.fail('[consulting.js cadidateProcess] Cadidate 적용실패', err)
        }
    }
   
    _prototype.sdpProcess = (msg) => {
        try {
            if (msg.sdp.type === 'answer') {
                window.videoPeer.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                window.Logger.success('[consulting.js sdpProcess] Answer sdp 적용')
                return
            }
        } catch (err) {
            window.Logger.fail('[consulting.js sdpProcess] Answer sdp 적용실패', err)
        }
    }

    function handleICECandidateEvent(evt) {
        if (!evt.candidate) return;
        let candidate = evt.candidate
        window.Logger.success('[consulting.js handleICECandidateEvent] Candidate 생성 및 전송')
        window.Notice.messageToServer({
            eventOp: 'Candidate',
            candidate,
            // usage: 'cam',
            useMediaSvr: 'N',
            userId: window.userId,
            roomId: window.roomId,            
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
        })
    }

    function handleVideoAddStreamEvent(event) {
        let screenVideo = document.getElementById('screen-video')
        console.log('event.stream', event.stream)
        if (!screenVideo.srcObject) {
            alert('한번')
            screenVideo.srcObject = event.stream
        }
    }

    function handleAddStreamEvent(event) {
        let yourVideo = document.getElementById('your-video')
        yourVideo.srcObject = event.stream
    }

    function acceptHandler() {
        window.Logger.success('전화 승낙')
        _prototype.hideConfirmView()
        _prototype.showOptionMenuView()
        window.Notice.messageToServer({
            eventOp: 'Join',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
            roomId: window.roomId,
            status: 'accept',
        })
    }

    function rejectHandler() {
        window.Logger.success('전화 거절')
        window.Notice.messageToServer({
            eventOp: 'Join',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
            roomId: window.roomId,
            status: 'reject',
        })
        _prototype.hideInvitation()
    }
    return new ConsultingController()
})()
