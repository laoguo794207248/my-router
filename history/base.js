export function createRoute(record, location) {
  let res = []
  if (record) {
    while(record) {
      res.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched: res
  }
}

export default class Base {
  constructor(router) {
    this.router = router
    /**
     * 默认匹配项，后续会根据路由改变而替换
     * 保存匹配到的组件
     */
    this.current = createRoute(null, {
      path: '/'
    })
  }
  /**
   * location 要跳转的路径
   * onComplete 跳转完成之后的回调
   */
  transitionTo(location, onComplete) {
    /**
     * 去匹配当前hash的组件
     */
    let route = this.router.match(location)
    /**
     * 匹配完成，将current给修改掉
     * 相同路径就不进行跳转了
     */
    if(this.current.path === location && route.matched.length === this.current.matched.length) return
    /**
     * 有了当前的current，我们的vue各个组件该怎样访问
     */
    this.updateRoute(route)
    onComplete && onComplete()
  }

  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route)
  }

  linsten(cb) {
    this.cb = cb
  }
}