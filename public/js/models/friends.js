const FriendModel = (() => {
    let self
    function FriendController(friends) { 
        self = this
        this.friends = friends || []
    }

    let _prototype = FriendController.prototype

    _prototype.getFriends = () => {
        return self.friends
    }

    _prototype.setFriends = (friends) => {
        self.friends = friends
    }

    return new FriendController()
})()
