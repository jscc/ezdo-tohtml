import EzDom from './edom.js'
import cm from './../middle/connectorManager.js'
import Ctor from './../middle/connector.js'

class Render {
    constructor() {
        this.isInit = false
    }
    render(nodesMap) {
        if(!this.isInit) {
            return
        }
        nodesMap.forEach(nodeMap => {
            let dom = new EzDom(this.newVContainer())
            dom.render(nodeMap)
            dom = null
        })
    }
   init(node, did) {
       if(this.isInit) {
           return
       }
       let container = document.getElementById(did)
       if(container) {
            let eid = 'puc'+( Math.floor(Math.random() * 2000) + 100 )
            container._eid = eid
            let ctor = new Ctor()
            ctor.el = container
            cm.set(eid, ctor)
            let dom = new EzDom(this.newVContainer())
            dom.newFragment(node)
            container.appendChild(dom.mFragment)
            dom = null
            this.isInit = true
       }
   }
   newVContainer() {
       return document.createDocumentFragment()
   }
}

export default new Render()