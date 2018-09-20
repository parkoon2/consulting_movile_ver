const FriendModel = (() => {
    let self
    function FriendModel(friends) { 
        self = this
        this.friends = friends || []
    }

    let _prototype = FriendModel.prototype

    _prototype.getFriends = () => {
        return self.friends
    }

    _prototype.setFriends = (friends) => {
        self.friends = friends
    }

    return new FriendModel()
})()
