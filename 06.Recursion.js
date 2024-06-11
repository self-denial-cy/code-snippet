// 0 1 1 2 3 5 8，假设第 0 个是 0，第 1 个是 1，求第 n 个数的实现方式？

function fn(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fn(n - 2) + fn(n - 1)
}

console.log(fn(6))
