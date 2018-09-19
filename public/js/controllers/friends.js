const FriendsController = (() => {
    function FriendsController() { }

    let _prototype = FriendsController.prototype

    _prototype.handleFriendList = (msg, callback) => {
        let code = msg.code * 1 || 200
        if (code !== 200) {
            window.Notice.alert(msg.message)
        }

        let friends = msg.result
        
        FriendModel.setFriends(friends)

        if (typeof callback === 'function') {
            callback()
        }
    
    }

    _prototype.createFriendDOM = (callback) => {
        let friends = FriendModel.getFriends()
        let friendField = $('#friend-field')
        for (let friend of friends) {
            let str = `<li>
            <a class="bookmark on">즐겨찾기</a>
                <div class="info">
                    <strong>${friend.name}</strong>
                    <span>${friend.id}</span>
                </div>
                <a class="phone" data-user-id="${friend.id}" data-state="${friend.user_state}">전화하기</a>
            </li>`
            let dom = window.Domify.createDomFromStr(str)
            friendField.append(dom)
            window.Domify.addEvent({
                el: dom.getElementsByTagName('a')[0],
                type: 'call',
                eventName: 'ringdingdong',
            });
        }
    }

    _prototype.createCompanyDOM = (callback) => {
        let companies = CompanyModel.getCompanies()
        let companyField = $('#company-field')
        for (let compay of companies) {
            let str = `<li>
            <a class="bookmark on">즐겨찾기</a>
                <div class="info">
                    <strong>${compay.company_name}</strong>
                    <span>${compay.manager_name}</span>
                </div>
                <a class="phone" data-user-id="${compay.service_number}" >${compay.service_number}</a>
            </li>`
            let dom = window.Domify.createDomFromStr(str)
            companyField.append(dom)
            window.Domify.addEvent({
                el: dom.getElementsByTagName('a')[0],
                type: 'call',
                eventName: 'ringdingdong',
            })

        }

        if (typeof callback === 'function') {
            callback()
        }
    }


    

    _prototype.handleCompanyList = (msg, callback) => {
        let code = msg.code * 1 || 200
        if (code !== 200) {
            window.Notice.alert(msg.message)
        }

        let friends = msg.result
        
        CompanyModel.setCompanies(friends)

        if (typeof callback === 'function') {
            callback()
        }
    
    }
    
    _prototype.requestFriends = () => {
        window.Notice.messageToServer({
            eventOp: 'FriendList',
            option: {
                isAll: true,
                limit: 15,
                offset: 0,
                searchAllStr: '',
                searchIdStr: '',
                searchNameStr: '',
            },
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
        })
    }
    
    _prototype.requestCompanies = () => {
        window.Notice.messageToServer({
            eventOp: 'SingleAddressInfo',
            option: {
                limit: 15,
                offset: 0,
                searchAllStr: '',
                searchCompanyNameStr: '',
                searchManagerNameStr: '',
                searchServiceNumberStr: '',
            },
            reqNo: window.DateOfMessage.getReqNo(),
            reqDate: window.DateOfMessage.getReqDate(),
            userId: window.userId,
        })
    }
    return new FriendsController()
})()
