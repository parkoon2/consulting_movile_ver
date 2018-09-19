const Domify = (() => {
    let self
    function Domify() {
        self = this
    }

    
    Domify.prototype.hasClass = (el, className) => {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    Domify.prototype.addClass = (el, className) => {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className))
            el.className += " " + className
    }
    Domify.prototype.removeClass = (el, className) => {
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className=el.className.replace(reg, ' ')
        }
    }
    
    Domify.prototype.addEvent = (opt) => {
        let el = opt.el
        let type = opt.type
        let eventName = opt.eventName
        console.log('eventName',eventName)
        let event;
        if (type === 'call') {
            el.addEventListener('click', function() {
                event = new CustomEvent(eventName, {
                    detail: {
                        spot: el,
                    }
                })
                window.dispatchEvent(event)
            })
            return
        }
    }

    Domify.prototype.createDomFromStr = (str) => {
        let el = document.createElement('div');
        el.innerHTML = str;
        return el.firstChild;
    }

    let INSTANCE

    return {
        getInstance: function() {
            if (!INSTANCE) {
                INSTANCE = new Domify()
            }
            return INSTANCE
        }
    }
})()