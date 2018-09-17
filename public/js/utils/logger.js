const Logger = (() => {
    function Logger() {

    }

    const success = [
        'background: green',
        'color: white',
        'display: block',
        'text-align: center'
    ].join(';')

    const failure = [
        'background: red',
        'color: white',
        'display: block',
        'text-align: center'
    ].join(';')

    let INSTANCE

    // 참고
    // https://medium.freecodecamp.org/how-to-get-the-most-out-of-the-javascript-console-b57ca9db3e6d
    Logger.prototype.success = (msg, data) => {
        if (!data) data = ''
        console.log(`%c ${msg}`, success, data)
    }

    Logger.prototype.info = (msg, data) => {
        if (!data) data = ''
        console.info(msg, data)
    }
    
    Logger.prototype.fail = (msg, data) => {
        if (!data) data = ''
        console.log(`%c ${msg}`, failure, data)
    }

    return {
        getInstance: function() {
            if (!INSTANCE) {
                INSTANCE = new Logger()
            }
            return INSTANCE
        }
    }
    
})()