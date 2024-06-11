function debounce(fn, wait, immediate = false) {
  let timer = null
  let isInvoke = false

  function _debounce() {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      if (immediate && !isInvoke) {
        const result = fn.apply(this, arguments)
        resolve(result)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, arguments)
          resolve(result)
          isInvoke = false
          timer = null
        }, wait)
      }
    })
  }

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}
