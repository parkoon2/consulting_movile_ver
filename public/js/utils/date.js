const DateOfMessage = (() => {
    function DateOfMessage() {

    }
    DateOfMessage.prototype.getReqNo = () => {
        window.reqNo += 2;

        if(!window.reqNo){
            window.reqNo = 0;
        }
        //클라이언트에서 요청은 홀수로 처리..짝수값이 나왔을 경우 홀수로 변경
        if(Number(window.reqNo) % 2 == 0){
            ++ window.reqNo;
        }

        return window.reqNo.toString();
    };

    DateOfMessage.prototype.getReqDate = () => {
        const today = new Date();
        const ss = today.getSeconds();
        const mi = today.getMinutes();
        const hh = today.getHours();
        const dd = today.getDate();
        const mm = today.getMonth()+1;
        const yyyy = today.getFullYear();
        return addZero(yyyy) + '' + addZero(mm) + '' + addZero(dd) + '' + addZero(hh) + '' + addZero(mi) + '' + addZero(ss);
    }

    function getTodayDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth()+1;
        const yyyy = today.getFullYear();
        return addZero(yyyy) + '. ' + addZero(mm) + '. ' + addZero(dd);
    };

    function addZero(num) {
        let value = num;
        if (num < 10) {
            value = '0' + num;
        }
        return value;
    }


    let consultingTime;

    function startConsultingTime() {
        let yy, mm, ss = 0
        let todayTime = '- - : - -';
        if (!consultingTime) {
            consultingTime = setInterval(function() {
                ss++;
                if(ss >= 60){
                    ss = 0;
                    mm++;
                }
                if(mm >= 60){
                    mm = 0;
                    yy++;
                }
                todayTime = addZero(yy) + ' : ' + addZero(mm) + ' : ' + addZero(ss);
            }, 1000);
        }
    }

    function date(date, param) {
        const _date = new Date(date);
        const yyyy = addZero(_date.getFullYear()),
                mm = addZero(_date.getMonth() + 1),
                dd = addZero(_date.getDate()),
                hh = addZero(_date.getHours()),
                mi = addZero(_date.getMinutes()),
                ss = addZero(_date.getSeconds())

        let result = '';

        switch(param) {
            case 'date' :
                result = yyyy + '.' + mm + '.' + dd;
                break;
            case 'hhmm' :
                result = hh + ':' + mi;
                break;
            case 'hhmmss' :
                result = hh + ':' + mi + ':' + ss;
                break;
            default :
                result = yyyy + '.' + mm + '.' + dd + ' / ' + hh + ':' + mi;
        }

        return result;
    }


    let INSTANCE
    return {
        getInstance: function() {
            if (!INSTANCE) {
                INSTANCE = new DateOfMessage
            }
            return INSTANCE
        }
    }
})()


