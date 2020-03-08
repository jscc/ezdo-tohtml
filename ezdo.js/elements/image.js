import Node from './node'

class Image extends Node {
    constructor() {
        super('img')
    }
    set src(path) {
        this._attr.src = path
    }
    get src() {
        return this._attr.src
    }
}

export default Image