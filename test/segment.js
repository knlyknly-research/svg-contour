import assert from 'assert'
import Line from '../src/utils/Line'
import Segment from '../src/utils/Segment'
import Point from '../src/utils/Point'

let line, seg;



describe('vertical line', () => {
  before(() => {
    seg = new Segment([1, 0], [1, 20])
    line = seg.line()
  })
  it('should be vertical', () => {
    assert.equal(line.vertical, true)
  })
  it('should have m == Infinity', () => {
    assert(! isFinite(line.m))
  })
  it('should have  inter of 1', () => {
    assert.equal(line.inter, 1)
  })
})
describe('standar line', () => {
  before(() => {
    seg = new Segment([0,2], [5, 0])
    line = seg.line()
  })
  it('should have m == -2/5', () => {
    assert.equal(-2/5, line.m)
  })
  it('should have  inter of 2', () => {
    assert.equal(line.inter, 2)
  })
})

describe('standar line2', () => {
  before(() => {
    seg = new Segment([-2,0], [0, 2])
    line = seg.line()
  })
  it('should have m == 1', () => {
    assert(line.m === 1)
  })
  it('should have  inter of 2', () => {
    assert.equal(line.inter, 2)
  })
})
describe('standar line3', () => {
  before(() => {
    seg = new Segment([100, 100], [99, -220])
    line = seg.line()
  })
  it('should have m < 0', () => {
    assert.equal(seg.m , 320)
  })
})
describe('zeroLength', () => {
  before(() => {
    seg = new Segment([-2,0], [-2, 0])
  })
  it('zeroLength true', () => {
    assert(seg.zeroLength())
  })
})
