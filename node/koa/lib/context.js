let proto =  {

}

function defineGetter(prop, name) { // prop代表对象， name代表对象的属性
  proto.__defineGetter__(name, function() { // 每个对象都有__defineGetter__方法
    return this[prop][name] // url === this.request.url
  })
}

function defineSetter(prop, name) {
  proto.__defineSetter__(name, function(val) {
    return this[prop][name] = val
  })
}
defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = proto