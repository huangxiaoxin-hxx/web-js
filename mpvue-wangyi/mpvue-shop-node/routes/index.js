const router = require('koa-router')({
  prefix: '/wy'
})

const controllers = require('../controllers')

router.get('/index/index', controllers.home.index)

module.exports = router
