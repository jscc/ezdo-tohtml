import render from './../render/index'
class EzCmd {
    constructor() {
        this.renderTime = 20
        this.timeId = 0
        // this.isInit = false

        // 命令类型
        this.shell_add = 'add'
        this.shell_del = 'del'
        this.shell_mod = 'mod'

        // 操作类型
        this.ctrl_class = 'class'
        this.ctrl_attr = 'attr'
        this.ctrl_text = 'text'
        this.ctrl_node = 'node' // 删除或新增
        this.ctrl_event = 'event'

        // 
        this.tasks = []
        this.shells = new Map()
    }

    _ez_hasParentIsAdd(node) {
        // 判断 shells 里有没有 parent 是添加或者删除
        for (let shell of this.shells.values()) {
            if(shell) {
                if(shell.get('node')._eid === node.parent._eid) {
                    if(shell.get('cmd') !== this.shell_mod) {
                        return true
                    }
                }
            }
        }
        return false
    }

    _ez_handle() {
        let needDeleteItems = []
        this.shells.forEach(shell => {
            if(shell.get('cmd') === 'add') {
                let node = shell.get('node')
                if(this._ez_hasParentIsAdd(node)) {
                    needDeleteItems.push(node._eid)
                }
            }
        })
        while(needDeleteItems.length) {
            let _eid = needDeleteItems.shift()
            this.shells.delete(_eid)
        }
    }

    push() {
        if( this.timeId !== 0) {
            return
        }
        this.timeId = setTimeout(() =>{
           this._ez_handle()
            render.render(this.shells)
           this.shells.clear()
           clearTimeout(this.timeId)
           this.timeId = 0
        }, this.renderTime)
    }

    commit(shell, ctrl, node, parent) {
        if(!render.isInit || !node.parent) {
            return
        }

        let cmd = this.shells.get(node._eid)
        if(cmd) {
            if(cmd.get('cmd') === this.shell_mod) {
                cmd.set('cmd', shell)
            }else {
                if(shell !== this.shell_mod) {
                    cmd.set('cmd', shell)
                }
            }
        }else {
            let newCmd = new Map()
            newCmd.set('cmd', shell)
            newCmd.set('node', node)
            this.shells.set(node._eid, newCmd)
        }
        if(parent) {
            this.shells.get(node._eid).set('parent', parent)
        }
        
        this.push()
    }
}

export default new EzCmd()