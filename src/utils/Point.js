
export default class Point {
  constructor(x, y) {
    this.x = Number(x.toPrecision(5))
    this.y = Number(y.toPrecision(5))
  }
  isEqual(other) {
    return this.x === other.x && this.y === other.y
  }
  lerp(other, t) {
    const x = this.x + (other.x - this.x) * t
    const y = this.y + (other.y - this.y) * t
    return new Point(x, y)
  }
  avg(other) {
    return this.lerp(other, 0.5)
  }
  dist(other) {
    return Math.hypot(this.x - other.x, this.y - other.y)
  }
}

Point.prototype[Symbol.iterator] = function* () {
  yield this.x
  yield this.y
}
