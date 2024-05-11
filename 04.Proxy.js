// 01. receiver 参数
const proxy1 = new Proxy({}, {
  get(target, key, receiver) {
    return receiver
  }
})

console.log(proxy1.key === proxy1) // true

const obj = Object.create(proxy1)

console.log(obj.key === obj) // true

// 02. this 指向问题
// Proxy 不是目标对象的透明代理，即不做任何拦截，Proxy 实例与目标对象的行为也无法保证一致
// 原因在于，通过 Proxy 实例访问目标对象的 getter 属性或方法，其内部 this 都会指向 Proxy 实例
const target = {
  fn() {
    console.log(this === proxy2)
  }
}

const proxy2 = new Proxy(target, {})
target.fn()
proxy2.fn()


const _name = new WeakMap()

class Person {
  constructor(name) {
    _name.set(this, name)
  }

  get name() {
    return _name.get(this)
  }
}

const jerry = new Person('Jerry')
console.log(jerry.name)
console.log(new Proxy(jerry, {}).name) // getter 内部 this 指向 Proxy 实例


// 有些原生对象的方法，运行时会校验 this 类型，比如说 getDate 方法只能是 Date 实例才能运行
console.log(new Proxy(new Date(), {}).getDate.call(new Date()))
