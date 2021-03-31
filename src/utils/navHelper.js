import store from '@/store'

export function setNavSate(routePath) {
  let pathStr = routePath.substring(1)
  const pathArr = pathStr.split('/');
  const path1 = pathArr[0] //base
  const path2 = pathArr[1] //第一级nav
  const path3 = pathArr[2] //第二级nav
  const path4 = pathArr[3] // 页面.
  // console.log(1111,path1,path2,path3,pathArr);
  if (path1 == 'base') {
    if (pathArr.length == 2) {
      path2 ? (store.state.leftNavActive = path2) : null
      // path2 ? (store.state.leftNavOpen = [path2]) : null
    } else if (pathArr.length == 3) {
      //path2 ? (store.state.leftNavOpen = [path2]) : null
      path3 ? (store.state.leftNavActive = path3) : null
    }
    store.state.leftNavList.forEach((res) => {
      res.secondNav.forEach(v => {
        if (v.name == path2) {
          store.state.leftNavOpen = [res.name]
        }
      })
    })

  } else if (path1 == 'index') {

  }
}
