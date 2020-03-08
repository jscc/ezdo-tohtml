class EventBus {
  
  constructor() {
    this.events = {}
  }

  emit(eventType, params) {
    let handlers = this.events[eventType]
    if(handlers) {
      handlers.forEach(handler => {
        handler(params)
      });
    }
  }

  on(eventType, handler) {
    let handlers = this.events[eventType]
    if(!handlers) {
      // handler.bind(this)
      this.events[eventType] = [handler]
    }
  }

  off(eventType, handler) {
    let handlers = this.events[eventType]
    if(handlers) {
      handlers.splice(
        handlers.findIndex(handlerItem => handlerItem === handler),
        1
      )
    }
  }

  offAll(eventType) {
    delete this.events[eventType]
  }
}

export default EventBus