import shortid from 'shortid'

class EzObj {
    constructor() {
        this._eid = shortid.generate()
        this._ename = 'ezobj'
        this._isVdom = true
        this._ez_create_type = 'cd'
    }

    _ez_del_attr(key) {
        delete this[key]
    }
}

export default EzObj