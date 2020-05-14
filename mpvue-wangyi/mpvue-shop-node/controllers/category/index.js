const { mysql } = require('../../mysql')

// 获取分类列表
async function categoryNav (ctx) {
  const categoryId = ctx.query.categoryId
  console.log(categoryId)
  // 获取当前分类
  const currentNav = await mysql('nideshop_category').where({
    'id': categoryId
  }).select()
  // 获取它的同类
  const navData = await mysql('nideshop_category').where({
    'parent_id': currentNav[0].parent_id
  }).select()
  console.log(currentNav)
  ctx.body = {
    currentNav: currentNav[0],
    navData
  }
}

module.exports = {
  categoryNav
}