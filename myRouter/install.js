import routerView from './components/view'

export let _vue
/**
 * 1. 注册全局属性 $route $router
 * 2. 注册全局组件 router-view router-link
 */
export default function install(Vue) {
  _vue = Vue
  Vue.mixin({
    beforeCreate () {
      if(this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router

        // 调用router的init
        this._router.init(this)
        // 怎样让this.current变成响应式的
        // Vue.util.defineReactive = vue.set()
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  /**
   * 怎么让所有的组件都能访问到current
   */
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })
  /**
   * 怎么让所有的组件都能访问到router实例
   */
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })
  /**
   * 注册全局组件
   */
  Vue.component('router-view', routerView)
}