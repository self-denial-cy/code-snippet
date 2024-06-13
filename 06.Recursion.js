// 斐波那契数列【用数组存值减少计算】
function fibonacci(n) {
  const fibArr = [0, 1]
  if (n <= 1) return fibArr[n]
  for (let i = 2; i <= n; i++) {
    fibArr[i] = fibArr[i - 2] + fibArr[i - 1]
  }
  return fibArr[n]
}

console.log(fibonacci(6))
