import install from './install'
import createMatcher from './create-matcher'
import HashHistory from '../history/hash'

export default class Router {
  constructor(options) {
    /**
     * 将用户的数据扁平化
     * [
     *  {
     *    path: '/ss',
     *    component: SSS
     *  }
     * ]
     * => {'/ss': SSS, '/sss/aa': a}
     * 
     * matcher会有俩个方法
     * 1. match 用来匹配路径和组件
     * 2. addRoutes 用来动态的添加组件
     */

    this.matcher = createMatcher(options.routes || [])

    this.mode = options.mode || 'hash'

    this.history = new HashHistory(this)

  }
  init(app) {  // main vue
    const history = this.history
    const setupHashLinster = () => {
      history.setupHashLinstener()
    }

    history.transitionTo(
      // 首次进入的时候跳转到对应的hash
      // 回调用来监听hash的改变
      history.getCurrentLocation(),
      setupHashLinster
    )

    history.linsten((route) => {
      app._route = route
    })
  }

  match(location) {
    return this.matcher.match(location)
  }
  
  /**
   * 用户调用的跳转方法
   */
  push() {

  }
  replace() {

  }
}

Router.install = install