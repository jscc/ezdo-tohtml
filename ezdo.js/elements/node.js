import shell from '../ezcmd/index'
import EzText from './text'
import EzObj from './ezobj'

class Node extends EzObj {
    constructor(nodeType) {
        super()
        this.type = nodeType || 'div'
        this._attr = {
            class: [],
            value: undefined,
            id: undefined
        }
        this.children = []
        this._listener = {}
        this.ezText = null,
        this.parent = null,
        this._ez_html_str = ''
    }
    
    on(eventType, handler, caller) {
        this._listener[eventType] = handler.bind(caller || this)
        shell.commit(shell.shell_mod, shell.ctrl_event, this, null)
    }
    off(eventType, handler) {
        delete this._listener[eventType]
        shell.commit(shell.shell_mod, shell.ctrl_event, this, null)
    }

    add(node) {
        node.parent = this
        this.children.push(node)
        shell.commit(shell.shell_add, shell.ctrl_node, node, this)
        return this
    }
    remove(node) {
        for(var i = this.children.length-1; i >= 0; i--) {
            let child = this.children[i]
            if(node._elId === child._elId) {
                this.children.splice(i,1)
                break
            }
        }
        shell.commit(shell.shell_del, shell.ctrl_node, node, this)
        for(var key in this) {
            let n = this[key]
            if(n && n._ename) {
                if(n._eid === node._eid) {
                    this._ez_del_attr(key)
                    break
                }
            }
        }
        return this
    }
    removeAll() {
        // 可优化
        while(this.children.length) {
            this.remove(this.children[this.children.length-1])
        }
    }
    addAttr(key, value) {
        this._attr[key] = value
        shell.commit(shell.shell_mod, shell.ctrl_attr, this, null)
    }
    removeAttr(key, value) {
        delete this._attr[key]
        shell.commit(shell.shell_mod, shell.ctrl_attr, this, null)
    }
    addClass(val) {
        this._attr.class.push(val)
        shell.commit(shell.shell_mod, shell.ctrl_attr, this, null)
    }
    removeClass(val) {
        this._attr.class = this._attr.class.filter(item => {
            return item !== val
        })
        shell.commit(shell.shell_mod, shell.ctrl_attr, this, null)
    }
    
    set value(value) {
        if(this._attr.value === value) {
            return
        }
        this._attr._value = value
        shell.commit(shell.shell_mod, shell.ctrl_text, this, null)
    }
    get value() {
        return this._attr._value
    }
    set id(value) {
        if(this._attr.id === value) {
            return
        }
        this._attr.id = value
        shell.commit(shell.shell_mod, shell.ctrl_text, this, null)
    }
    get id() {
        return this._attr.id
    }

    set text(value) {
        if(!this.ezText) {
            this.ezText = new EzText()
            this.add(this.ezText)
        }
        if(this.ezText.text === value) {
            return
        }
        
        this.ezText.text = value
    }
    get text() {
        if(this.ezText) {
            return this.ezText.text
        }
        return ''
    }

    get html() {
        return this._ez_html_str
    }

    set html(value) {
        if(value === this._ez_html_str) {
            return
        }
        this._ez_html_str = value
        shell.commit(shell.shell_mod, shell.ctrl_text, this, null)
    }
}

export default Node