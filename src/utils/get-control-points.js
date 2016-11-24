const pipe = require('./pipe')
const pointLerp = require('./point-lerp')

// getPoints:: pathData -> [[Number, Number]]
const getPoints = pd =>
  pd.reduce((ac, x) => {
    let i = 0
    while (i + 2 <= x.values.length) {
      ac.push(x.values.slice(i, i + 2))
      i = i + 2
    }
    return ac
  }, [])

// controlPolygonSegments ::
// [[Number, Number]] -> [[[Number,Number], [Number,Number]]]
// given an array of points it gives back an array of segments
const controlPolygonSegments = points => {
  const res = []
  let i = -1
  while (++i < points.length - 1)
    res.push([
      points[i],
      points[i + 1]
    ])
  return res
}

// segmentsAndDeltas ::
// [[Number,Number], [Number,Number]] ->
// [[
// {point:[Number,Number], delta:[Number,Number]},
// {point:[Number,Number], delta:[Number,Number]}
// ]]
// given an array of segments it calculates an Object
// of point and delta for both points of segment
// keeps the segments grouped in an array
// y = m*x + c + d*sqrt(1+m^2);
const segmentsAndDeltas = offset => segments =>
  segments.map(([p1, p2]) => ([
    { point: p1, delta: pointLerp(offset, p1, p2) },
    { point: p2, delta: pointLerp(offset, p2, p1) }
  ]))

// pointDelimiters :: [
// [  {point, delta},
// {point, delta}  ]
// ] ->
// [
//  [{
//      point: Point,
//      up: Point,
//      down: Point
//    },
//    {
//      point: Point,
//      up: Point,
//      down: Point
//    }]
// ]
// we map each point segment in the array
// ( income segments are mappend to {point:Point, delta:Point} )
// to a point with borders connected to other correspoing border point
const pointDelimiters = pointDeltaSegments =>
  pointDeltaSegments.map(segment =>
    segment.map(({ point, delta }, i) => {
      console.log('point, delta', point, delta);
      const [up, down] = (
        i === 0 ?
        correspondingBorderOffset(point, delta, true) :
        correspondingBorderOffset(point, delta, false)
      )
      return { point, up, down }
    }))


const getControlPoints = offset => pipe(
  getPoints,
  controlPolygonSegments,
  segmentsAndDeltas(offset),
  pointDelimiters
)

module.exports.default = getControlPoints
module.exports.getPoints = getPoints


// utility of pointDeltsSegments
// in essence it turns the radPoint 90deg on either sides to get the up and down points
function correspondingBorderOffset(center, radPoint, frontward) {
  const [px, py] = radPoint
  const [cx, cy] = center
  const r = Math.hypot(px - cx, py - cy)
  const sin = (cy - py) / r
  const cos = (cx - px) / r

  const a = [r * -sin + cx, r * cos + cy]
  const b = [r * sin + cx, r * -cos + cy]
  return (
    frontward ?
    [a, b] : [b, a]
  )
}
