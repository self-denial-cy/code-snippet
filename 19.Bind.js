// 实现一个 bind

function Bind(fn, ctx, ...args) {
  return function () {
    return fn.apply(ctx, args.concat(...arguments))
  }
}

function bar(val1, val2) {
  console.log(val1, val2)
  console.log(this.value)
}

const fn = Bind(bar, { value: 123 }, 456)
fn(789)
