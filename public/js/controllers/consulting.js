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

    let _prototype = ConsultingController.prototype

    _prototype.handlePresence = (msg) => {
        // action > join: 방 참가 | exit: 방 나감 | reject: 참여 거절
        let action = msg.action.toUpperCase()
        let username = msg.userName || msg.userId || ''

        switch(action) {
            case 'JOIN':
                window.Logger.success(`${username} 님과 정상적으로 전화 연결이 되었습니다.`)
                self.startConsulting({
                    hostType: 'callee'
                })
                break

            case 'EXIT':
                window.Logger.success(`상대방이 전화를 끊었습니다.`)
                self.stopConsulting(() => {
                    window.Notice.alert('상대방이 전화를 끊었습니다.')
                })
                break
            

            case 'REJECT':
                window.Logger.success(`${username} 님께서 전화를 거절 하셨습니다.`)
                break
            case 'END':
                // 방장이 방 남감.
                break
        }
    }
    // <a id="camera-toggle-btn" class="camera">카메라</a>
    // <a id="audio-toggle-btn" class="audio off">소리</a>
    _prototype.toggleAudio = () => {
        let audioToggleBtn = document.getElementById('audio-toggle-btn')
        let audioOn
        audioOn = !(window.videoStream.getAudioTracks()[0].enabled)
        window.videoStream.getAudioTracks()[0].enabled = audioOn

        if (audioOn) {
            window.Domify.removeClass(audioToggleBtn, 'off')
        } else {
            window.Domify.addClass(audioToggleBtn, 'off')
        }
    }
    _prototype.toggleCamera = () => {
        let cameraToggleBtn = document.getElementById('camera-toggle-btn')
        let videoOn
        
        videoOn = !(window.videoStream.getVideoTracks()[0].enabled)
        window.videoStream.getVideoTracks()[0].enabled = videoOn

        if (videoOn) {
            window.Domify.removeClass(cameraToggleBtn, 'off')
        } else {
            window.Domify.addClass(cameraToggleBtn, 'off')
        }
    }

    _prototype.sendExitroomMessage = () => {
        window.Notice.messageToServer({
            eventOp: 'ExitRoom',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
            userName: window.userName,
            roomId: window.roomId,
        })
    }

    _prototype.handleExitroomResponse = (msg) => {
        let code = msg.code * 1 || 200
        let message = msg.message || ''
        if (code !== 200) {
            window.Logger.fail(msg.message)
            return
        }
        self.stopConsulting()
    }

    _prototype.stopConsulting = (callback) => {
        // 1. 비디오 및 스트림 스트림 제거
        self.stopStreamedVideo(
            [
                document.getElementById('screen-video'),
                document.getElementById('your-video'),
                document.getElementById('my-video'),
            ], 
            () => {
                // 2. peer close
                self.closeVideoPeer()
                self.closeScreenPeer()

                // 3. 비디오 Default 이미지로 변경
                // bla bla

                // 4. 메인화면으로 이동
                MainController.showMainPage()
                WhiteboardController.hideWhiteboardView()
                self.hideVideochat()
                
                // 5. 룸 제거
                if (window.roomId) window.roomId = null

                //6. 화이트보드 초기화
                WhiteboardController.initWhiteboard()
                

                if (typeof callback === 'function') callback()
            }
        )
    }

    _prototype.closeVideoPeer = () => {
        if (window.videoPeer) {
            window.Logger.success('initialize video peer')
            window.videoPeer.close()
            window.videoPeer = null
        }
    }
    _prototype.closeScreenPeer = () => {
        if (window.screenPeer) {
            window.Logger.success('initialize screen peer')
            window.screenPeer.close()
            window.screenPeer = null
        }
    }
    
    _prototype.inviteProcess = (msg) => {
        window.Logger.info('inviteProcess')
        MainController.hideMainPage()
        self.showVideochat()

        self.hideOptionMenuView()
        self.showConfirmView()

        window.roomId = msg.roomId
        window.targetId = msg.targetId


    }

    _prototype.showVideochat = () => {
        let $invitePopup = $('#app-videochat')
        $invitePopup.css('display', 'block')
    }

    _prototype.hideVideochat = () => {
        let $invitePopup = $('#app-videochat')
        $invitePopup.css('display', 'none')
    }

    _prototype.hideConfirmView = () => {
        let $btnGroup = $('#confrim-btn-group')
        let $comment = $('#comment')
        $btnGroup.css('display', 'none')
        $comment.css('display', 'none')
    }

    _prototype.showConfirmView = () => {
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
            self.hideVideochat()
            return
        }
        self.startConsulting({
            hostType: 'caller',
        })
    }

    _prototype.rquestCall = (evt) => {
        let spot = evt.detail.spot
        let target = spot.dataset.userId

        if (!target) {
            window.Logger.fail('[consulting.js requestCall] Target error')
            return
        }

        window.Logger.info(`${target} 님에게 전화연결 시도중..`)
        window.Notice.messageToServer({
            eventOp: 'Call',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
            targetId: target,
            serviceType: 'call',
            reqDeviceType: 'genie',
        })
    }

    _prototype

    _prototype.startP2PScreenshare = (msg) => {
        try {

            if (msg.hasOwnProperty('code')) {
                window.Logger.info('Code 처리 부분')
                return
            }

            window.Logger.success('[consulting.js startP2PScreenshare] P2P 화면공유 시작')
            window.screenPeer = new RTCPeerConnection(self.configuration)
            window.Logger.success('[consulting.js startP2PScreenshare] P2P Screen peer 생성')

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
        console.log('####################################')
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

    _prototype.goToVideoPage = () => {
        WhiteboardController.hideWhiteboardView()
        self.showVideochat()
    }
    

    _prototype.handleCallRespose = (msg) => {
        let code = msg.code * 1 || 200
        let message = msg.message

        if (code !== 200) {
            window.Notice.alert(message)
            return
        }

        window.roomId = msg.roomId
    }

    _prototype.cadidateProcess = (msg) => {
        try {
            if (msg.candidate) {
                let candidate = new RTCIceCandidate(msg.candidate)
                window.videoPeer.addIceCandidate(candidate)
            }
        } catch (err) {
            window.Logger.fail('[consulting.js cadidateProcess] Cadidate 적용실패', err)
        }
    }
   
    _prototype.sdpProcess = (msg) => {
        try {
            if (msg.sdp.type === 'answer') {
                window.videoPeer.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                return
            }
            console.log('msg.sdp.type', msg.sdp.type)
            if (msg.sdp.type === 'offer') {
                window.videoPeer.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                window.videoPeer.createAnswer(function(answerSdp) {
                    window.videoPeer.setLocalDescription(new RTCSessionDescription(answerSdp))
                    
                    window.Notice.messageToServer({
                        eventOp: 'SDP',
                        sdp: answerSdp,
                        // usage: 'cam',
                        useMediaSvr: 'N',
                        userId: window.userId,
                        roomId: window.roomId,            
                        reqNo: window.DateOfMessage.getReqNo(),
                        reqDate: window.DateOfMessage.getReqDate(),
                    })

                    // parkoon 화면을 켜는 시점을 다시 체크해보자
                    MainController.hideMainPage()
                    self.showVideochat()
                    self.showOptionMenuView()
                    self.hideConfirmView()
                    return

                }, function (err) {
                    throw err
                })
            }
        } catch (err) {
            window.Logger.fail('[consulting.js sdpProcess] SDP error', err)
        }
    }

    function handleICECandidateEvent(evt) {
        if (!evt.candidate) return;
        let candidate = evt.candidate
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

    _prototype.acceptHandler = () => {
        window.Logger.success('전화 승낙')
        self.hideConfirmView()
        self.showOptionMenuView()
        window.Notice.messageToServer({
            eventOp: 'Join',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
            roomId: window.roomId,
            status: 'accept',
        })
    }

    _prototype.rejectHandler = () => {
        window.Logger.success('전화 거절')
        window.Notice.messageToServer({
            eventOp: 'Join',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
            roomId: window.roomId,
            status: 'reject',
        })
        self.hideVideochat()
        MainController.showMainPage()
    }

    _prototype.stopStreamedVideo = (videoElems, callback) => {
        if (Array.isArray(videoElems)) {
            for (let videoElem of videoElems) {
                let stream = videoElem.srcObject;
                if (stream) {
                    self.removeTrack(stream, () => {
                        videoElem.srcObject = null;
                    })
                }
            }
        } else {
            let stream = videoElems.srcObject;
            if (stream) {
                self.removeTrack(stream, () => {
                    videoElems.srcObject = null;
                })
            }
        }
        if (typeof callback === 'function') callback()
    }
    
    _prototype.removeTrack = (stream, callback) => {
        let tracks = stream.getTracks()
        tracks.forEach(function(track) {
            window.Logger.success(`Video track is stopped`, track)
            track.stop()
        })
        if (typeof callback === 'function') callback()
    }

    return new ConsultingController()

})()
