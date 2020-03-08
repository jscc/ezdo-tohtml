
import ToHtml from './ToHtml.js'
import Home from './test/src/pages/index.js'

let str = ToHtml.toString(new Home())
console.log(str)

