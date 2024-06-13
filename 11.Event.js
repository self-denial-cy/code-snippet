class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(name, cb) {
    if (!this.events[name]) this.events[name] = []
    this.events[name].push(cb)
  }

  off(name, cb) {
    if (this.events[name]) {
      this.events[name] = this.events[name].filter(_ => _ !== cb)
    }
  }

  once(name, cb) {
    const fn = (...args) => {
      cb(...args)
      this.off(name, fn)
    }
    this.on(name, fn)
  }

  trigger(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach(_ => _(...args))
    }
  }
}
