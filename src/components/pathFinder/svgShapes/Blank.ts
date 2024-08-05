import { TemplateAPI } from '@livereader/graphly-d3'

const schema = {
  type: 'object',
  properties: {
  },
  required: [],
}


export default {
  shapeSize: 0.1,
  shapeBuilder: shapeBuilder,
  shapePayload: schema
}

function shapeBuilder () {
  // eslint-disable-next-line new-cap
  const shape = TemplateAPI.Shape.Rectangle(1, 1)

  return shape
}
