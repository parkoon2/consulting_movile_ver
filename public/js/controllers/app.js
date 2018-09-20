$(document).ready(()=> {
    let $loginBtn = $('#login-btn')
    let $userId = $('#user-id')
    let $userPwd = $('#user-pwd')

    let $tabBtns = $('.main .gnb a')

    let $whiteboardPageBtn = $('#whiteboard-page-btn')
    let $videoPageBtn = $('#video-page-btn')
    let $searchFriendInput = $('#search-friend-input') 
    let $searchCompanyInput  = $('#search-company-input') 
    let $searchBookmarkInput = $('#search-bookmark-input')
    
    // let $changeCameraBtn = $('#change-camera-btn')
    // let $mentBtn = $('#menu-btn') 
    let $cameraToggleBtn = $('#camera-toggle-btn')
    let $audioToggleBtn = $('#audio-toggle-btn')
    let $stopCallbtn = $('#stop-call-btn')

    let $findIdBtn = $('#find-id-btn')
    let $findPwdBtn = $('#find-pwd-btn')
    let $saveIdBtn = $('#save-id-btn')

    let $acceptBtn = $('#accept-btn')
    let $rejectBtn = $('#reject-btn')


    
    // Socket
    window.Socket.on('gigagenie', SocketController.eventHandler)

    // Call    
    window.addEventListener('ringdingdong', ConsultingController.rquestCall)
    
    // Login page
    $loginBtn.click(LoginController.loginButtonClick)
    $userPwd.keyup(LoginController.userPwdHandler)
    $userId.keyup(LoginController.userIdHandler)
    $findPwdBtn.click(LoginController.findPassword)
    $findIdBtn.click(LoginController.findId)
    
    $saveIdBtn.change(LoginController.handleSaveId)
    
    // Main page
    $tabBtns.click(MainController.tabHandler)
    $searchFriendInput.keyup(MainController.realtimeSearching)
    $searchCompanyInput.keyup(MainController.realtimeSearching)
    $searchBookmarkInput.keyup(MainController.realtimeSearching)

    // Whiteboard page
    $whiteboardPageBtn.click(WhiteboardController.goToWhiteboardPage)

    // Videochat page
    $videoPageBtn.click(ConsultingController.goToVideoPage)
    $stopCallbtn.click(ConsultingController.sendExitroomMessage)
    $cameraToggleBtn.click(ConsultingController.toggleCamera)
    $audioToggleBtn.click(ConsultingController.toggleAudio)
    $acceptBtn.click(ConsultingController.acceptHandler)
    $rejectBtn.click(ConsultingController.rejectHandler)
    
})