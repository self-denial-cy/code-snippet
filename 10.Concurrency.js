// 有 10 个异步请求，如何保持同时三个的并发

const timeoutArr = [1000, 3000, 2000, 9000, 8000, 7000, 5000, 3000, 1000, 700]

// 模拟异步请求
function query(timeout) {
  return new Promise(resolve => {
    console.log('请求：' + timeout)
    setTimeout(() => resolve(timeout), timeout)
  })
}

const requestArr = timeoutArr.map(timeout => {
  return () => {
    return query(timeout)
  }
})

function concurrency(requestArr = [], count = 3) {
  let i = count
  const concurrencyArr = requestArr.slice(0, count).map(createNewRequest)

  run()

  function createNewRequest(request) {
    const newRequest = request().then(res => {
      concurrencyArr.splice(concurrencyArr.indexOf(newRequest), 1)
      return res
    })
    return newRequest
  }

  function run() {
    if (!concurrencyArr.length) return
    Promise.race(concurrencyArr).then(res => {
      console.log('弹出：' + res)
      if (i < requestArr.length) {
        concurrencyArr.push(createNewRequest(requestArr[i++]))
      }
      run()
    })
  }
}

concurrency(requestArr)
