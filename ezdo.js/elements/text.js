import EzObj from './ezobj'
import shell from '../ezcmd/index'

class Text extends EzObj{
    constructor() {
        super()
        this._ez_data = ''
        this._ez_create_type = 'new'
        this.type = 'Text'
    }

    set text(value) {
        if(this._ez_data !== value) {
            this._ez_data = value
            shell.commit(shell.shell_mod, shell.ctrl_text, this, null)
        }
    }
    get text() {
        return this._ez_data
    }
}

export default Text