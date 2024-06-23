// 实现一个 Promise

class _Promise_ {
  constructor(executor) {
    // 初始化
    this.initValue()
    // 初始化 this 指向，保证 resolve 和 reject 方法中的 this 永远指向当前 Promise 实例，而不会随着执行环境中的 this 而变更
    this.initBind()
    try {
      // 执行 executor
      executor(this.resolve, this.reject)
    } catch (error) {
      // 在 executor 中 throw 错误的话会在这里处理，同时满足 throw --> reject 的操作和 throw 后的代码不会执行的要求
      this.reject(error)
    }
  }
  initValue() {
    // 初始化值与状态
    this.PromiseResult = null
    this.PromiseState = 'pending'
    // 回调数组初始化
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }
  initBind() {
    // 保证每一个 resolve 和 reject 方法只会更改自己的 Promise 实例
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve(value) {
    // 保证状态变更就会凝固
    if (this.PromiseState !== 'pending') {
      return
    }
    this.PromiseResult = value
    this.PromiseState = 'fulfilled'
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()()
    }
  }
  reject(reason) {
    // 保证状态变更就会凝固
    if (this.PromiseState !== 'pending') {
      return
    }
    this.PromiseResult = reason
    this.PromiseState = 'rejected'
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()()
    }
  }
  then(onFulfilled, onRejected) {
    // 接收两个回调函数
    // 参数校验，保证回调必定是函数
    // 成功回调默认返回入参
    // 失败回调默认抛出错误
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : res => res
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    const thenPromise = new _Promise_((resolve, reject) => {
      const resolvePromise = (callback) => {
        console.log(this)
        /**
         * setTimeout 的作用（只是用 setTimeout 暂代，因为 Promise 是异步微任务，而 setTimeout 是异步宏任务）
         * 1.保证 thenPromise 的可得性（如果上一步 Promise 中无异步操作，将会导致这里 thenPromise 尚未定义完成，就调用 resolvePromise）
         * 2.保证 then 方法的两个回调是异步的（不管 executor 中是同步还是异步代码，都能保证）
         */
        setTimeout(() => {
          try {
            const result = callback(this.PromiseResult)
            if (result === thenPromise) {
              throw new Error('不能返回自身')
            }
            if (result instanceof _Promise_) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.PromiseState === 'fulfilled') {
        // 因为 executor 中无异步操作，这里执行 resolvePromise 里的 this 直接指向当前 Promise 实例
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        // 因为 executor 中无异步操作，这里执行 resolvePromise 里的 this 直接指向当前 Promise 实例
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        // 因为 executor 中有异步操作，因此需要将 this bind 一下，要根据上一个 Promise 实例的 PromiseResult 来判断下一个实例的状态变更
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })
    // 每一次调用 then 方法都会返回一个新的 Promise 实例，构成链式关系
    return thenPromise
  }
}
