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
    

    _prototype.realtimeSearching = (evt) => {
        let $target = $(evt.target)
        let filter = $(evt.target).val().toUpperCase()
        let list = $target.parent().siblings().children()

        for (let li of list) {
            let name = li.querySelector('strong')
            if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li.style.display = 'block';
            } else {
                li.style.display = 'none';
            }
        }
    }

    _prototype.showMainPage = () => {
        let $main = $('#app-main')
        $main.css('display', 'block')
    }

    _prototype.hideMainPage = () => {
        let $main = $('#app-main')
        $main.css('display', 'none')
    }

    return new MainController()
})()




