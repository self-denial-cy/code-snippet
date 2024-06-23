// 用 reduce 实现 map
function implementMapUsingReduce(list, func) {
  return list.reduce((arr, item, index) => {
    arr[index] = func(item, index)
    return arr
  }, [])
}

console.log(implementMapUsingReduce([1, 2, 3], (x) => x * 2))
