// 拍平数组
function flatten(list) {
  if (list.length === 0) return []
  const head = list[0]
  if (head instanceof Array) {
    list[0] = flatten(head)
  } else {
    list[0] = [list[0]]
  }
  return list[0].concat(flatten(list.slice(1)))
}

console.log(flatten([1, 2, 3, [4, 5]]))

// 更进一步，实现指定深度的拍平
function flattenDepth(list, depth) {
  if (list.length === 0) return []
  if (depth === 0) return list
  const head = list[0]
  if (head instanceof Array) {
    list[0] = flattenDepth(head, depth - 1)
  } else {
    list[0] = [list[0]]
  }
  return list[0].concat(flattenDepth(list.slice(1), depth))
}

console.log(flattenDepth([1, 2, [3, [4, 5]]], 2))
