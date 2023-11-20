// 观察者模式实现

// 被观察者
class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    const index = this.observers.findIndex(_ => _.name === observer.name)
    this.observers.splice(index, 1)
  }

  notifyObservers(message) {
    this.observers.forEach(observer => observer.notified(message))
  }
}

// 观察者
class Observer {
  constructor(name, subject) {
    this.name = name
    if (subject) {
      subject.addObserver(this)
    }
  }

  notified(message) {
    console.log(this.name, 'get message', message)
  }
}

const subject = new Subject()
const observer = new Observer('observer', subject)
subject.notifyObservers('hello observer')
