class AttrClass {
  constructor() {
    this.classes = []
  }

  add($class) {
    if(this.classes.find(cls => cls === clss)) {
      this.classes.add($class)
    }
  }

  del($class) {
    this.classes.splice(
      this.classes.findIndex(cls => cls === $class),
      1
    )
  }
}

export default AttrClass
