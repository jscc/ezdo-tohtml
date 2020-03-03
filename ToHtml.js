// 转换 node 为 html 字符串

class ToH
{
	constructor() 
	{
		this.$UNCLOSE = [
			"br", "hr", "img", "input", "link", "meta", "area", "base", "col", "command", "embed", "keygen", "param", "source", "track", "wbr"
		]
	}
	
	toString($node)
	{
		if(!$node)
		{
			return ''
		}
		
		let props = ''
		if($node.$props)
		{
			let value = ''
			for(let key in $node.$props)
			{
				value = $node.$props[key]
				if(Array.isArray($node.$props[key])) 
				{
					value = value.join(' ')
				}
				props += ` ${key}="${value}"`
			}
		}
		let html = ''
		if(this.$UNCLOSE.indexOf($node) === -1)
		{
			html += `<${$node.$type}${props}>`
			if($node.children && $node.children.length)
			{
				$node.children.forEach(child => {
					html += this.toString(child)
				})
			}
			html += `</${$node.$type}>`
		}
		else
		{
			html += `<${$node.$type}${props}/>`
		}
		
		return html
	}
}

module.exports = new ToH()