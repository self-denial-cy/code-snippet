// 实现一个 apply

function Apply(fn, ctx, args = []) {
  ctx.fn = fn
  const res = ctx.fn(...args)
  delete ctx.fn
  return res
}

function bar(val) {
  console.log(val)
  console.log(this.value)
}

Apply(bar, { value: 123 }, [456])
