// 发布订阅模式实现

// 发布订阅中心
class PubSub {
  constructor() {
    this.messages = {}
    this.listeners = {}
  }

  publish(type, message) {
    if (!this.messages[type]) {
      this.messages[type] = []
    }
    this.messages[type].push(message)
  }

  subscribe(type, cb) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(cb)
  }

  notify(type) {
    const messages = this.messages[type]
    const listeners = this.listeners[type] || []
    listeners.forEach(cb => cb(messages))
  }
}

// 发布者
class Publisher {
  constructor(name, context) {
    this.name = name
    this.context = context
  }

  publish(type, message) {
    this.context.publish(type, message)
  }
}

// 订阅者
class Subscriber {
  constructor(name, context) {
    this.name = name
    this.context = context
  }

  subscribe(type, cb) {
    this.context.subscribe(type, cb)
  }
}

const type = 'TYPE'
const pubsub = new PubSub()
const publisher = new Publisher('publisher', pubsub)
const subscriber = new Subscriber('subscriber', pubsub)

publisher.publish(type, 'hello publisher&subscriber')
subscriber.subscribe(type, (messages) => {
  console.log(messages)
})

pubsub.notify(type)
