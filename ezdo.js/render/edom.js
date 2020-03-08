import pucEvent from './../utils/listener'
import Connector from './../middle/connector'
import cm from './../middle/connectorManager'
class EzDom {
    constructor(fragment) {
        this.mFragment = fragment
    }

    newFragment(node, parent) {
        if(!parent) {
            parent = this.mFragment
        }
        
        let el = this.newView(node)
        parent.appendChild(el)

        this._updateNode(node)
        if(node.children && node.children.length) {
            let len = node.children.length
            for(var i = 0; i < len; i++) {
                this.newFragment(node.children[i], el)
            }
        }
    }
    render(nodeMap) {
        let node = nodeMap.get('node')
        let nodeId = node._eid
        let nodeCmd = nodeMap.get('cmd')
        let ctor = null
        switch(nodeCmd) {
            case 'del':
                ctor = cm.get(nodeId)
                if(ctor && ctor.el && ctor.el.parentNode) {
                    ctor.el.parentNode.removeChild(ctor.el)
                }
                delete cm.delete(nodeId)
                break
            case 'add':
                ctor = cm.get(nodeMap.get('parent')._eid)
                this.newFragment(node, ctor.el)
                break
            case 'mod':
                this._updateNode(node)
                break
        }
    }
    _updateNode(node) {
        let ctor = cm.get(node._eid)
        if(ctor) {
           let el = ctor.el
           if(node._attr) {
                for(var key in node._attr) {
                    let v = node._attr[key]
                    if(v instanceof Array) {
                        if(v.length) {
                            v = v.join(' ')
                        }else {
                            v = null
                            el.removeAttribute(key)
                        }
                    }
                    if(v) {
                        if(el.getAttribute(key) != v) {
                            el.setAttribute(key, v)
                        }
                    }
                }
            }
           if(node._listener) {
               for(var key in el._plisteners) {
                   if(!node._listener[key]) {
                       pucEvent.removeEvent(el, key, this.handlerProxy)
                   }
               }
               for(var key in node._listener) {
                   if(!el._plisteners || !el._plisteners[key]) {
                    pucEvent.addEvent(el, key, this.handlerProxy)//node._listener[key])
                   }
               }
           }

           if(node.html) {
               el.innerHTML = node.html
           }
        }


        
    }

    handlerProxy(e) {
        let evt = e || event
        if(!evt) {
            console.warn('evt is undefined')
            return
        }
        if(!evt.target.__ez__eid) {
            console.warn('not found element')
            return
        }

        let ctor = cm.get(evt.target.__ez__eid)
        
        if(ctor) {
            if(ctor.vn.type === 'input') {
                if(ctor.vn._attr._value != ctor.el.value) {
                    ctor.vn._attr._value = ctor.el.value
                }
            }
        }
        
        // this.el2vn(ctor)
        let handler = ctor.vn._listener[evt.type]
        if(handler) {
            handler(ctor.vn)
        }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
    }   

    newView(node) {
        let el = null

        if(node._ez_create_type === 'cd') {
            el = document.createElement(node.type)
        }else if(node._ez_create_type === 'new'){
            if(node.type === 'Text') {
                el = new Text(node._ez_data)
            }
        }
        el.__ez__eid = node._eid
        let ctor = new Connector()
        ctor.el = el
        ctor.vn = node
        cm.set(node._eid, ctor)
        
        return el
    }

    el2vn(ctor) {
        
    }
}

export default EzDom