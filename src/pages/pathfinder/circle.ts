import { TemplateAPI, Node } from '@livereader/graphly-d3'

export default {
  shapeSize: 40,
  shapeBuilder: shapeBuilder,
  // TODO add payload schema
}

function shapeBuilder (data: Node) {
  let shape = null
  // const {
  //   Shape,
  //   SVGShape,
  //   TextCollection,
  //   CollectionStyle,
  //   ShapeStyle,
  //   Alignment,
  //   OnZoom,
  //   LODStyle,
  // } = Template;
  if (data.payload.last) {
    shape = TemplateAPI.SVGShape(`
      <circle id="body" cx="25" cy="25" r="25"/>
      <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="16" x2="25" y2="34"/>
      <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="34.5" y1="25" x2="15.5" y2="25"/>
    `)
  }
  else {
    shape = TemplateAPI.Shape.Circle(25)
  }

  // shape.style('fill', data.payload?.bgColor ?? '#9575cd');
  // shape.style('stroke', data.payload?.borderColor ?? '#0000FF');
  if (data.payload?.title !== 'Blank') {
    shape.style('fill', '#D1D1D1')
    shape.style('stroke', '#D1D1D1')
  } else {
    shape.style('fill', 'transparent')
    shape.style('stroke', '#ff0000')
  }
  shape.classed('cursor-pointer', true)

  if (!data.payload.last) {
    const boundingBox = TemplateAPI.Shape.getBBox(shape)
    const titleShape = TemplateAPI.TextCollection(
      data.payload?.title ?? '',
      TemplateAPI.CollectionStyle(
        50,
        boundingBox.width * 2,
        boundingBox.width * -0.5,
        boundingBox.height * 1.6,
        10,
        10,
        2,
        TemplateAPI.Alignment.Center
      ),
      [
        TemplateAPI.ShapeStyle('class', 'gly_text.light'),
        TemplateAPI.ShapeStyle('font-size', '1.2em'),
      ]
    )
    shape.append(() => titleShape.node())
  }

  // OnZoom(
  //   data,
  //   [0.6],
  //   [LODStyle(titleShape, 'class', 'hidden', (k) => k < 0.6)]
  // );

  return shape
}
