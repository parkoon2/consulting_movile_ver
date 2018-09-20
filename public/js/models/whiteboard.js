const WhiteboardModel = (() => {
    let self
    function WhiteboardModel() {
        self = this
        this.color = 'black'
        this.thickness = 5
        this.eraserSize = 21
        this.textSize = 24
        this.tooltype = 'pen'
    }

    let _prototype = WhiteboardModel.prototype

    _prototype.setTooltype = (val) => {
        self.tooltype = val
    }

    _prototype.getTooltype = () => {
        return self.tooltype
    }

    _prototype.getColor = () => {
        return self.color
    }

    _prototype.setColor = (val) => {
        self.color = val
    }

    _prototype.getThickness = () => {
        return self.thickness
    }

    _prototype.setThickness = (val) => {
        self.thickness = val
    }

    _prototype.getEraserSize = () => {
        return self.eraserSize
    }

    _prototype.setEraserSize = (val) => {
        self.eraserSize = val
    }

    _prototype.getTextSize = () => {
        return self.textSize
    }

    _prototype.setTextSize = (val) => {
        self.textSize = val
    }

    return new WhiteboardModel()
})()