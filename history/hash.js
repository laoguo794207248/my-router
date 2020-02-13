import Base from './base'

const getHash = () => {
  return window.location.hash.slice(1)
}

const ensureSlash = () => {
  if (window.location.hash) return
  window.location.hash = '/'
}

export default class Hash extends Base {
  constructor(router) {
    super(router)
    // 确保hash是有#/的
    ensureSlash()
  }

  getCurrentLocation() {
    return getHash()
  }

  setupHashLinstener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash())
    })
  }
}