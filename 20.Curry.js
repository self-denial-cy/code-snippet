// 实现一个柯里化函数

function Curry(fn, ...args) {
  const len = fn.length
  return function () {
    const newArgs = args.concat(...arguments)
    if (newArgs.length < len) {
      return Curry.call(this, fn, ...newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}

function multi(a, b, c) {
  return a * b * c
}

const fn = Curry(multi, 1, 2)
console.log(fn(3))
