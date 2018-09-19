$(document).ready(()=> {
    let $loginBtn = $('#login-btn')
    let $userId = $('#user-id')
    let $userPwd = $('#user-pwd')

    let $tabBtns = $('.main .gnb a')

    let $whiteboardBtn = $('#whiteboard-btn')
    let $changeCameraBtn = $('#change-camera-btn')
    let $mentBtn = $('#menu-btn') 
    let $cameraToggleBtn = $('#camera-toggle-btn') 
    let $audioToggleBtn = $('#audio-toggle-btn')
    let $stopCallbtn = $('#stop-call-btn')

    

    // Socket
    window.Socket.on('gigagenie', SocketController.eventHandler)

            
    window.addEventListener('ringdingdong', function (evt) {
        alert('dzdz')
    })

    // $loginBtn.click(function() {
    //     let event = new CustomEvent('ringdingdong')
    //     window.dispatchEvent(event)
    // })


    // Login page
    $loginBtn.click(LoginController.loginButtonClick)
    $userPwd.keyup(LoginController.userPwdHandler)
    $userId.keyup(LoginController.userIdHandler)
    
    // Main page
    $tabBtns.click(MainController.tabHandler)

    // Whiteboard page
    $whiteboardBtn.click(WhiteboardController.clickHander)
    
})