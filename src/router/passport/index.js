// 登录、找回密码模块
const Login = () => import(/* webpackChunkName: "passport" */ '../../pages/passport/Login')
const Verify = () => import(/* webpackChunkName: "passport" */ '../../pages/passport/Verify')
const Forgetpwd = () => import(/* webpackChunkName: "passport" */ '../../pages/passport/Forgetpwd')


export default [
  {
    path: '/passport/login',
    name: 'login',
    meta:{ title:'智能班牌登录' },
    component: Login,
  },
  {
    path: '/passport/verify',
    name: 'verify',
    meta:{ title:'手机号验证' },
    component: Verify,
  },
  {
    path: '/passport/forgetpwd',
    name: 'forgetpwd',
    meta:{ title:'找回密码' },
    component: Forgetpwd,
  },
]