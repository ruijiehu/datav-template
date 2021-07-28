/** 覆盖物集群 */
class OverlayGroup {
  constructor (map) {
    this.map = map
    this.overlayMap = {}
  }

  /** 添加一群覆盖物 */
  addOverlays (key, overlays = []) {
    delete this.overlayMap[key]
    if (!this.overlayMap[key]) {
      this.overlayMap[key] = overlays
      this.map.add(overlays)
    }
  }

  /** 移除某个类型的覆盖物 */
  remove (key) {
    if (this.overlayMap[key]) {
      this.map.remove(this.overlayMap[key])
      delete this.overlayMap[key]
    }
  }

  /** 移除所有的覆盖物 */
  removeAll () {
    const overlayKeys = Object.keys(this.overlayMap)
    overlayKeys.forEach(key => {
      this.remove(key)
    })
  }

  /** 销毁事件 */
  destroy () {
    this.map = null
  }

  // 返回一个包含所有overlay的一维数组
  getFlatOverlayArrs () {
    const overlayList = []
    const overlayValues = Object.values(this.overlayMap)
    overlayValues.forEach(item => {
      overlayList.push(...item)
    })
    return overlayList
  }
}
export default OverlayGroup
