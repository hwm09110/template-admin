const Banner = () => import(/* webpackChunkName: "bannerMage" */ '../../pages/bannerMage/Banner')
export default [
  {
    path: 'bannermage',
    name: 'bannermage',
    meta:{ title:'智能班牌系统-首页轮播'},
    component: Banner,
  }
]