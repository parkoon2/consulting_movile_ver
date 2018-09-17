// user 객체관리
((exports) => {
    const OPTION = {
        secure: true, 
        reconnect: true, 
        rejectUnauthorized: false, 
        transports: ['websocket'] 
    }
    exports.Socket = io.connect(window.socketInfo, OPTION)
    
    window.Socket.on('connect', () => {
        window.Logger.success('Socket Connected!!', window.Socket)
    })

    window.Socket.on('connect_error', (err) => {
        window.Logger.fail('Soekct Connection Fail!!', err)
    })

})(this)