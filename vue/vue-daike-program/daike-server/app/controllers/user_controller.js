const user_col = require('../models/user') 
const Password_col = require('../models/password')
const passport = require('../utils/passport')
const uuidv1 = require('uuid').v1
const config = require('../../config')

const get = async (ctx, next) => {
  ctx.status = 200,
  ctx.body = {
    msg: 'get request',
    data: {
      data: 'Hello World'
    }
  }
}


// 登入
const login = async (ctx, next) => {
  const req = ctx.request.body

  // 数据库查询
    // 获取用户的userID
  const user = await user_col.findOne({
    account: req.account 
  }, {
    __v: 0,
    _id: 0
  })
  if (!user) {
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '账号不存在'
    }
    return
  }

  const userId = user.userId

  // 获取数据库中的hash
  const pass = await Password_col.findOne({
    userId
  }, {
    hash: 1
  })

  const match = await passport.validate(req.password, pass.hash)
  ctx.status = 200
  if (match) {
    ctx.body = {
      code: 1,
      msg: '登录成功',
      data: user
    }
    return
  }
  ctx.body = {
    code: 0,
    msg: '密码错误'
  }
}


// 注册

const register = async (ctx, next) => {
  // 判断当前账号是否可注册
  const req = ctx.request.body
  // 获取用户的userId
  const user = await user_col.findOne({
    account: req.account
  },{
    __v: 0,
    _id: 0
  })
  ctx.status = 200
  if (user) {
    ctx.body = {
      code: 0,
      msg: '该账号已被注册'
    }
    return
  }
  // 插入用户

  const userId = uuidv1()
  const newUser = await user_col.create({
    userId,
    account: req.account
  })
  if (newUser) {
    // 加密
    const hash = await passport.encrypt(req.password, config.saltTimes)
    const newPass = await Password_col.create({
      hash,
      userId
    })
    if(newPass) {
      ctx.body = {
        code: 1,
        msg: '创建成功',
        data: newUser
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '注册失败'
      }
    }
  }
}
module.exports = {
  get,
  login,
  register
}