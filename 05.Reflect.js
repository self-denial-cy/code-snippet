/*
 * @Author: Jerry
 * @Date: 2023-11-28 18:13:11
 * @LastEditors: Jerry
 * @LastEditTime: 2023-11-28 18:40:02
 * @Description: ES6 Reflect
 */

/**
 * Reflect 设计目的
 * 1. 将 Object 上属于语言内部的方法，搬到 Reflect 上；现在，某些方法同时在 Object 和 Reflect 上，未来的新方法将只
 * 部署在 Reflect 上
 * 2. 修改某些 Object 方法的返回结果，使其更加合理；比如 Object.defineProperty 在无法定义属性时，会抛出错误，
 * 而 Reflect.defineProperty 只会返回 false
 * 3. 让 Object 操作都变成函数行为；比如 key in obj 和 delete obj[key] 转变成 Reflect.has 和 Reflect.deleteProperty
 * 4. Reflect 上的方法与 Proxy 拦截函数一一对应；这让 Proxy 可以方便地调用对应的 Reflect 方法，完成默认行为；
 * 也就是说，不管 Proxy 如何拦截，总可以在 Reflect 上获取默认行为
 */

// 01. receiver 参数
(function () {
  const obj = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar
    },
    set value(val) {
      return (this.foo = val)
    }
  }

  console.log(Reflect.get(obj, 'baz'))
  console.log(Reflect.get(obj, 'baz', {
    foo: 10,
    bar: 20
  })) // 传入 receiver 改变 getter 内部 this 指向

  console.log(Reflect.set(obj, 'value', 100))
  console.log(obj.foo)
  console.log(Reflect.set(obj, 'value', 200, {
    foo: 1
  })) // 传入 receiver 改变 setter 内部 this 指向
  console.log(obj.foo)
})();
