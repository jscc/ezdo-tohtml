
class EzEvent {
    addEvent(_target,eventType,fnHandler,useCapture){
        useCapture==undefined?useCapture=true:"";
        var touchable,isSurface,msPointerable;
        try{ msPointerable = window.navigator.msPointerEnabled?true:false; }catch(e){ msPointerable=false; }
        try{ touchable = ("ontouchstart" in document &&  !isPC()) ? true : false; }catch(e){ touchable=false; }
        try{ isSurface = ("ontouchstart" in document && isPC()) ? true : false }catch(e){ isSurface=false }
        var oEventType = null;
        if(msPointerable){
            switch(eventType){
                case "mousedown":
                    eventType="MSPointerDown";
                    break;
                case "mousemove":
                    eventType="MSPointerMove";
                    break;
                case "mouseup":
                    eventType="MSPointerUp";
                    break;
                case "mouseover":
                    eventType="MSPointerOver";
                    break;
                case "mouseout":
                    eventType="MSPointerOut";
                    break;
            }
        }else if(touchable){
            switch(eventType){
                case "mousedown":
                    eventType="touchstart";
                    break;
                case "mousemove":
                    eventType="touchmove";
                    break;
                case "mouseup":
                    eventType="touchend";
                    break;
                case "mouseover":
                    eventType="";
                    break;
                case "mouseout":
                    eventType="";
                    break;
            }
        }
        if(isSurface){
            switch(eventType){
                case "mousedown":
                    oEventType="touchstart";
                    break;
                case "mousemove":
                    oEventType="touchmove";
                    break;
                case "mouseup":
                    oEventType="touchend";
                    break;
                case "mouseover":
                    oEventType="";
                    break;
                case "mouseout":
                    oEventType="";
                    break;
            }	
        }
        if(eventType==""){
            return;
        }
        if(!_target['_plisteners']) {
            _target['_plisteners'] = {}
        }
        _target['_plisteners'][eventType] = fnHandler

        if (_target.addEventListener) {
            _target.addEventListener(eventType, fnHandler,useCapture);
        } else if (_target.attachEvent) {
            _target.attachEvent("on" + eventType, fnHandler);
        } else {
            _target["on" + eventType] = fnHandler;
        }
        if(!!oEventType){
            if (_target.addEventListener) {
                _target.addEventListener(oEventType, fnHandler,useCapture);
            } else if (_target.attachEvent) {
                _target.attachEvent("on" + oEventType, fnHandler);
            } else {
                _target["on" + oEventType] = fnHandler;
            }
        }
    }
    removeEvent(_target, eventType, fnHandler,useCapture){
        useCapture==undefined?useCapture=true:"";
        var touchable,isSurface,msPointerable;
        try{ msPointerable = window.navigator.msPointerEnabled?true:false; }catch(e){ msPointerable=false; }
        try{ touchable = ("ontouchstart" in document &&  !isPC()) ? true : false; }catch(e){ touchable=false; }
        try{ isSurface = ("ontouchstart" in document && isPC()) ? true : false }catch(e){ isSurface=false }
        var oEventType = null;
        if(msPointerable){
            switch(eventType){
                case "mousedown":
                    eventType="MSPointerDown";
                    break;
                case "mousemove":
                    eventType="MSPointerMove";
                    break;
                case "mouseup":
                    eventType="MSPointerUp";
                    break;
                case "mouseover":
                    eventType="MSPointerOver";
                    break;
                case "mouseout":
                    eventType="MSPointerOut";
                    break;
            }
        }else if(touchable){
            switch(eventType){
                case "mousedown":
                    eventType="touchstart";
                    break;
                case "mousemove":
                    eventType="touchmove";
                    break;
                case "mouseup":
                    eventType="touchend";
                    break;
                case "mouseover":
                    eventType="";
                    break;
                case "mouseout":
                    eventType="";
                    break;
            }
        }
        if(isSurface){
            switch(eventType){
                case "mousedown":
                    oEventType="touchstart";
                    break;
                case "mousemove":
                    oEventType="touchmove";
                    break;
                case "mouseup":
                    oEventType="touchend";
                    break;
                case "mouseover":
                    oEventType="";
                    break;
                case "mouseout":
                    oEventType="";
                    break;
            }	
        }
        if(_target['_plisteners']) {
            delete _target['_plisteners'][eventType]
        }
        

        if (_target.removeEventListener) {
            _target.removeEventListener(eventType, fnHandler,useCapture);
        } else if (_target.detachEvent) {
            _target.detachEvent("on" + eventType, fnHandler);
        } else {
            _target["on" + eventType] = null;
        }
        if(!!oEventType){
            if (_target.removeEventListener) {
                _target.removeEventListener(oEventType, fnHandler,useCapture);
            } else if (_target.detachEvent) {
                _target.detachEvent("on" + oEventType, fnHandler);
            } else {
                _target["on" + oEventType] = null;
            }
        }
    }
    isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
}
export default new EzEvent()