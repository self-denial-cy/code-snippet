// 实现两个非常大的数字【已经超出 Number 范围】的求和
function bigNumberSum(a, b) {
  let cur = 0
  // 将两个数字对齐
  while (cur < a.length || cur < b.length) {
    if (!a[cur]) {
      a = '0' + a
    } else if (!b[cur]) {
      b = '0' + b
    }
    cur++
  }

  let carried = 0
  const res = []
  for (let i = a.length - 1; i > -1; i--) {
    const sum = carried + Number(a[i]) + Number(b[i])
    if (sum > 9) {
      carried = 1
    } else {
      carried = 0
    }
    res[i] = sum % 10
  }
  if (carried === 1) res.unshift(1)

  return res.join('')
}

console.log(bigNumberSum('923', '456'))
