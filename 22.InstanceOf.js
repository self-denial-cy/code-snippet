// 实现一个 instanceOf 操作符

function instanceOf(instance, constructor) {
  let proto = Object.getPrototypeOf(instance)
  const prototype = constructor.prototype
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

console.log(instanceOf([], Number))
