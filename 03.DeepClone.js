// 深拷贝实现
function deepCopy(source) {
  const weakmap = new WeakMap()

  // 判断是否为数组
  function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  }

  // 判断是否是引用类型
  function isObject(val) {
    return val !== null && (typeof val === 'object' || typeof val === 'function')
  }

  function copy(input) {
    // 如果是函数或者原始类型，直接返回
    if (typeof input === 'function' || !isObject(input)) return input

    // 针对循环引用处理下
    if (weakmap.has(input)) return weakmap.get(input)

    // 针对三大包装类型处理下
    if (Object.prototype.toString.call(input) === '[object String]') {
      return Object(String.prototype.valueOf.call(input))
    } else if (Object.prototype.toString.call(input) === '[object Number]') {
      return Object(Number.prototype.valueOf.call(input))
    } else if (Object.prototype.toString.call(input) === '[object Boolean]') {
      return Object(Boolean.prototype.valueOf.call(input))
    }

    // 拷贝原型对象
    const output = isArray(input) ? [] : Object.create(Object.getPrototypeOf(input))

    weakmap.set(input, output)

    // for...in 遍历对象或数组本身及原型链上可遍历属性、hasOwnProperty 限制只遍历本身属性
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        output[key] = copy(input[key])
      }
    }

    // 针对以 Symbol 作为 key 的属性
    // const symbolKeys = Object.getOwnPropertySymbols(input)
    // if (symbolKeys.length) {
    //   for (let i = 0; i < symbolKeys.length; i++) {
    //     if (input.propertyIsEnumerable(symbolKeys[i])) {
    //       output[symbolKeys[i]] = copy(input[symbolKeys[i]])
    //     }
    //   }
    // }

    return output
  }

  return copy(source)
}
