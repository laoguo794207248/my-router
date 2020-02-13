import createRouteMap from './create-route-map'
import { createRoute } from '../history/base'

export default function createMatcher(routes) {
  /**
   * pathList => 路径的一个关系array [/sss, /sss/s, /sss/b]
   * pathMap => 路径和组件的关系map {/sss: 'ss', ....}
   */
  let { pathList, pathMap } = createRouteMap(routes)
  /**
   * 用来匹配路径
   */
  function match(location) {
    /**
     * 更具路径匹配组件并不能直接渲染组件，因该找到所有要匹配的项
     * path: 'about/a' => [about, aboutA]
     * 只有将父子组件都渲染才能完成工作。
     */
    let record = pathMap[location]
    let local = {
      path: location
    }
    if (record) {
      return createRoute(record, local)
    }
    return createRoute(null, local)
  }

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  return {
    match,
    addRoutes
  };
}
