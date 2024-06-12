// 简易模板引擎
function render(tpl, data) {
  return tpl.replace(/(\{\{(.+?)\}\})|(\{(.+?)\})/g, function ($1, $2, $3, $4, $5) {
    if ($3) return data[$3]
    return data[$5]
  })
}

const str = render('嗨，{{name}}您好，今天是星期{day}', {
  name: '张三',
  day: '三'
})

console.log(str)
