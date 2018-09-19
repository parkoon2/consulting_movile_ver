const LoginController = (() => {
    function LoginController() { }

    let _prototype = LoginController.prototype;
    let id, password

    _prototype.loginButtonClick = (evt) => {
        id = 'gtest1'
        password = 'test'
        if (!id) {
            window.Notice.alert('아이디를 입력해주세요')
            return
        }
        if (!password) {
            window.Notice.alert('패스워드를 입력해주세요')
            return
        }
        window.userId = id
        window.Notice.messageToServer({
            eventOp: 'Login',
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: id,
            userPw: window.SHA256.encrypt(password),
            deviceType: 'pc',
            serviceType: 'single',
        })
    }

    _prototype.userIdHandler = (evt) => {
        id = evt.target.value
    }
    _prototype.userPwdHandler = (evt) => {
        password = evt.target.value
    }

    _prototype.show = () => {
        let $main = $('#app-login')
        $main.css('display', 'block')
        reset()
    }

    _prototype.hide = () => {
        let $main = $('#app-login')
        $main.css('display', 'none')
        reset()
    }

    _prototype.loginProcess = (data) => {
        let code = data.code * 1 || 200

        // 로그인 실패
        if (code !== 200) {
            window.Logger.fail('[login.js loginProcess] 로그인 실패', data.message)
            // 411 --> ID Error
            // 412 --> Password Error
            if (code === 411) {
                window.Notice.alert(data.message)
                window.userId = ''
            } else if (code === 412) {
                window.Notice.alert(data.message)
            } else {
                window.Logger.fail('[login.js loginProcess] Unknown fail code')
            }
            return
        }

        // 로그인 성공
        window.userName = userName
        window.Logger.success('[login.js loginProcess] 로그인 성공', data.message)

        FriendsController.requestFriends()        
    }

    function reset() {
        let inputId = $('#user-id')
        let inputPassword = $('#user-pwd')
        id = ''
        password = ''
        inputId.val('')
        inputPassword.val('')
    }

    return new LoginController();
})()
