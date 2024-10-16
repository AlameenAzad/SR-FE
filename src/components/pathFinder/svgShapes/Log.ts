import { TemplateAPI, Node } from '@livereader/graphly-d3'

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    titleUp: { type: 'boolean' },
  },
  required: ['title', 'titleUp'],
}

export default {
  shapeSize: 40,
  shapeBuilder: shapeBuilder,
  shapePayload: schema
}

function shapeBuilder (data: Node) {
  let shape = null
  shape = TemplateAPI.SVGShape(`
      <circle cx="19" cy="19" r="17" fill="#D1D1D1"/>
      <circle cx="19" cy="19" r="18.5" stroke="#D74B4B"/>
      <path d="M24.982 22.798C24.982 23.014 24.934 23.236 24.832 23.452C24.73 23.668 24.598 23.872 24.424 24.064C24.13 24.388 23.806 24.622 23.44 24.772C23.08 24.922 22.69 25 22.27 25C21.658 25 21.004 24.856 20.314 24.562C19.624 24.268 18.934 23.872 18.25 23.374C17.56 22.87 16.906 22.312 16.282 21.694C15.664 21.07 15.106 20.416 14.608 19.732C14.116 19.048 13.72 18.364 13.432 17.686C13.144 17.002 13 16.348 13 15.724C13 15.316 13.072 14.926 13.216 14.566C13.36 14.2 13.588 13.864 13.906 13.564C14.29 13.186 14.71 13 15.154 13C15.322 13 15.49 13.036 15.64 13.108C15.796 13.18 15.934 13.288 16.042 13.444L17.434 15.406C17.542 15.556 17.62 15.694 17.674 15.826C17.728 15.952 17.758 16.078 17.758 16.192C17.758 16.336 17.716 16.48 17.632 16.618C17.554 16.756 17.44 16.9 17.296 17.044L16.84 17.518C16.774 17.584 16.744 17.662 16.744 17.758C16.744 17.806 16.75 17.848 16.762 17.896C16.78 17.944 16.798 17.98 16.81 18.016C16.918 18.214 17.104 18.472 17.368 18.784C17.638 19.096 17.926 19.414 18.238 19.732C18.562 20.05 18.874 20.344 19.192 20.614C19.504 20.878 19.762 21.058 19.966 21.166C19.996 21.178 20.032 21.196 20.074 21.214C20.122 21.232 20.17 21.238 20.224 21.238C20.326 21.238 20.404 21.202 20.47 21.136L20.926 20.686C21.076 20.536 21.22 20.422 21.358 20.35C21.496 20.266 21.634 20.224 21.784 20.224C21.898 20.224 22.018 20.248 22.15 20.302C22.282 20.356 22.42 20.434 22.57 20.536L24.556 21.946C24.712 22.054 24.82 22.18 24.886 22.33C24.946 22.48 24.982 22.63 24.982 22.798Z" stroke="black" stroke-miterlimit="10"/>
      <path opacity="0.4" d="M22.9008 17.2001C22.9008 16.8401 22.6188 16.2881 22.1988 15.8381C21.8148 15.4241 21.3048 15.1001 20.8008 15.1001" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M25.0008 17.2C25.0008 14.878 23.1228 13 20.8008 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    `)
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

  return shape
}
