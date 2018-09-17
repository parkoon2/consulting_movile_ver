$(document).ready(()=> {
    let $loginBtn = $('#login-btn')
    let $userId = $('#user-id')
    let $userPwd = $('#user-pwd')

    let $tabBtns = $('.main .gnb a')


    // Socket
    window.Socket.on('gigagenie', SocketController.eventHandler)

    // Login page
    $loginBtn.click(LoginController.loginButtonClick)
    $userPwd.keyup(LoginController.userPwdHandler)
    $userId.keyup(LoginController.userIdHandler)
    
    // Main page
    $tabBtns.click(MenuController.tabHandler)

})