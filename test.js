const to = require('./ToHtml')

class BaseNode 
{
	constructor() {
	    this.$type = 'div'
		this.$props = {}
		this.children = []
	}
	
	add(node)
	{
		this.children.push(node)
	}
	
	set(pk, pv)
	{
		this.$props[pk] = pv
	}
}


// test ...
let home = new BaseNode()
home.$type = 'div'
home.set('name', 'home')

for(let key in 'fghjjkllwefwgwge')
{
	let child = new BaseNode()
	home.add(child)
	child.set('class', ['a', 'b'])
}

let input = new BaseNode()
input.$type = 'input'
input.set('value', 'hello')
home.add(input)

let str = to.toString(home)
console.log(str)

