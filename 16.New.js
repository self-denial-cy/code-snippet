// 实现一个 new 操作符
function New(fn, ...args) {
  const res = Object.create(fn.prototype)
  const ret = fn.apply(res, args)
  if ((ret !== null && typeof ret === 'object') || typeof ret === 'function') return ret
  return res
}

function Person(name) {
  this.name = name
}

console.log(New(Person, 'Jerry'))
