// user 객체관리
((exports) => {
    // let option = {
    //     secure: true, 
    //     reconnect: true, 
    //     rejectUnauthorized: false, 
    //     transports: ['websocket'] 
    // }
    // exports.Socket = io.connect(window.socketInfo, option)
    // exports.socketId = exports.Socket.id
    exports.userId = ''
    exports.userName = ''
    exports.roomId = ''
    exports.targetId = ''
    exports.videoPeer = ''
    exports.videoStream = ''
    exports.screenPeer = ''
    exports.screenStream = ''
    
    // window.Socket.on('connect', () => {
    //     window.Logger.success('Socket Connected!!', window.Socket)
    // })

    // window.Socket.on('connect_error', (err) => {
    //     window.Logger.fail('Soekct Connection Fail!!', err)
    // })

})(this)