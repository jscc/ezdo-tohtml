import Node from './node'

class Input extends Node {
    constructor() {
        super('input')
        // if(value) {
        //     this.value = value
        // }
        this.on('input', this.onInput)
        this.change = null
    }

    onInput() { 
        if(this.change) {
            this.change(this.value)
        }
    }

}

export default Input