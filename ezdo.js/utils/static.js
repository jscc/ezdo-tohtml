import EventBus from "../events/EventBus"

let _uniqueNum = 0
let _eventBus = null
class Static { 
  static uniqueId() {
    return (++_uniqueNum).toString(16)
  }
  static event() {
    return _eventBus || (_eventBus = new EventBus())
  }
}
export default Static