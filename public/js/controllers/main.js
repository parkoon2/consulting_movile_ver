const MainController = (() => {
    function MainController() { }

    let _prototype = MainController.prototype;

    _prototype.tabHandler = (evt) => {
        evt.preventDefault()
        
        let $target = $(evt.target)
        let tab = $target.attr('href')
        
        $target.parent().addClass('on')
        $target.parent().siblings().removeClass('on')
        
        $('.main .list').not(tab).css('display', 'none')
        $(tab).show()
    }

    _prototype.show = () => {
        let $main = $('#app-main')
        $main.css('display', 'block')
    }

    _prototype.hide = () => {
        let $main = $('#app-main')
        $main.css('display', 'none')
    }

    return new MainController()
})()




