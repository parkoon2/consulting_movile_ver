const LoginController = (() => {
    function LoginController() {
        // let $saveIdBtn = $('#save-id-btn')
        // let $userId = $('#user-id')
        // let isIdSaved = localStorage.getItem('ID-SAVED')
        // let id = localStorage.getItem('ID')

        // if (isIdSaved  === 'true') {
        //     $saveIdBtn.prop('checked', true)
        //     $userId.val(id)
        // } else {
        //     $saveIdBtn.prop('checked', false)
        //     $userId.val('')
        // }
    }

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

    _prototype.handleSaveId = (evt) => {
        let $saveIdBtn = $('#save-id-btn')
        let isChecked = $saveIdBtn.is(':checked')
        localStorage.setItem('ID-SAVED', isChecked)

        if (isChecked) {
            let $userId = $('#user-id')
            // localStorage.setItem('ID', $userId.val())
        }

        // console.log(localStorage.getItem('ID-SAVED'))
        // console.log(localStorage.getItem('ID'))
    }

    _prototype.userIdHandler = (evt) => {
        id = evt.target.value
    }
    _prototype.userPwdHandler = (evt) => {
        password = evt.target.value
    }

    _prototype.findId = () => {
        window.location.href = 'https://knowledgetalk.co.kr:7500/';
    }
    
    _prototype.findPassword = () => {
        window.location.href = 'https://knowledgetalk.co.kr:7500/';
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
        window.Logger.success('[login.js loginProcess] 로그인 성공', data.message)
        window.userName = userName
        if (localStorage.getItem('ID-SAVED') === 'true') {
            localStorage.setItem('ID', id)
        }

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
