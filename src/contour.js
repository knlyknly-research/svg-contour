
const { drawPoint } = require('./utils/draw')
const contiguousBorderIntersection = require('./utils/contiguous-border-point-intersection')
const getControlPoints = require('./utils/get-control-points').default
const getPoints = require('./utils/get-control-points').getPoints
const controlPolygonSegments = require('./utils/get-control-points').controlPolygonSegments
const offsetLineSegmentIntersections = require('./utils/get-control-points').offsetLineSegmentIntersections
const getContour = require('./utils/get-contour')
const drawLine = require('./utils/draw-line')
const pipe = require('./utils/pipe')


const svgContour = (el, op) => {
  if (! el instanceof SVGGeometryElement)
    throw Error('svgContour element parameter accepts only instances of SVGGeometryElement')
  const offset = op.offset || op
  if (typeof offset !== 'number')
    throw Error('svgContour offset option must be a number')
  const append = op.append || true
  if (typeof append !== 'boolean')
    throw Error('svgContour append option must be a boolean')
  const style = op.style || el.style
  if (typeof style !== 'object')
    throw Error('svgContour append option must be a object')

  const pathData = el.getPathData({ normalize: true })

  // const contourD = pipe(
  //   getPoints,
  //   controlPolygonSegments,
  //   x => {console.log('what we got',;x); return x},
  //   offsetLineSegmentIntersections(offset)
  // )(pathData)
  const contourD = getContour(10)(pathData)

  console.log('contourD', contourD)
  const contourPath = drawLine(style, contourD, el.getPathData({ normalize: true }))

  if (append)
    el.parentElement.appendChild(contourPath)

  return contourPath
}


const testStyles = {
  stroke: '#00ff00', stokeWidth: 1
}
const testStyles2 = {
  stroke: 'blue', stokeWidth: 1
}

/** *** **/
const testP = document.querySelector('path')
svgContour(testP, {
  offset: -15, style: testStyles2
})