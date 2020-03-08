import Node from './node'

class Link extends Node {
    constructor() {
        super('a')
        this.addClass('link')
        this.addAttr('href', 'javascript:')
    }
}

export default Link