/*
 * @Author: Jerry
 * @Date: 2023-11-28 10:56:09
 * @LastEditors: Jerry
 * @LastEditTime: 2023-11-28 18:06:01
 * @Description: ES6 Proxy
 */

// 01. receiver 参数
(function () {
  const proxy = new Proxy({}, {
    get(target, key, receiver) {
      return receiver
    }
  })

  console.log(proxy.key === proxy) // true

  const obj = Object.create(proxy)

  console.log(obj.key === obj) // true
})();

// 02. this 指向问题
(function () {
  // Proxy 不是目标对象的透明代理，即不做任何拦截，Proxy 实例与目标对象的行为也无法保证一致
  // 原因在于，通过 Proxy 实例访问目标对象的 getter 属性或方法，其内部 this 都会指向 Proxy 实例
  const target = {
    fn() {
      console.log(this === proxy)
    }
  }

  const proxy = new Proxy(target, {})
  target.fn()
  proxy.fn()

  /** ======================================================================================== */

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

  /** ======================================================================================== */

  // 有些原生对象的方法，运行时会校验 this 类型，比如说 getDate 方法只能是 Date 实例才能运行
  console.log(new Proxy(new Date(), {}).getDate.call(new Date()))
})();
