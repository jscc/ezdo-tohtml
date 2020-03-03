let str = '<br> <hr> <img> <input> <link> <meta> <area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>'

let newStr = str.replace(/\</g,'"').replace(/\>/g,'",').trim()

console.log(newStr)