// 实现函数 compose，接受多个函数作为参数，并返回一个新函数，新的函数将从右向左执行原函数，并将上一次结果的返回值作为下一个函数的参数
// compose 函数要求原函数只能有一个参数，因为每次执行原函数只能得到一个返回值

function compose(...fns) {
  return (...args) => fns.reduceRight((acc, cur) => cur(acc), ...args)
}

function a(str) {
  return str + 'a'
}

function b(str) {
  return str + 'b'
}

function c(str) {
  return str + 'c'
}

const f = compose(c, b, a)
console.log(f('hello'))
