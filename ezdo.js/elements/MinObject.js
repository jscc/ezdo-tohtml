import Static from "../utils/static";

class MinObject {
  constructor() {
    this.uniqueId = Static.uniqueId()
    this.event = Static.event()
  }
}