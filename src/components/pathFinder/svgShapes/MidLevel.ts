import { TemplateAPI, Node } from '@livereader/graphly-d3'

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    titleUp: { type: 'boolean' },
    selected: { type: 'boolean' },
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
      <circle cx="19" cy="19" r="18.5" stroke="#FCC330"/>
      <g clip-path="url(#clip0_873_22247)">
      <path d="M24.0522 14.2642C24.0447 14.1133 23.9347 13.985 23.7854 13.9548C23.7726 13.9523 23.7599 13.9505 23.7472 13.9493L19.4384 13.5232C19.3382 13.5132 19.2406 13.5485 19.1699 13.6192L14.0909 18.6985C13.3291 19.4603 13.3291 19.925 14.0909 20.6867L17.3139 23.91C17.6554 24.2517 17.9551 24.4787 18.3081 24.4787C18.6611 24.4787 18.9607 24.251 19.3016 23.9098L24.3814 18.8302C24.4521 18.7597 24.4872 18.6612 24.4774 18.5617L24.0522 14.2642ZM18.8304 23.4385C18.6702 23.5987 18.4417 23.8118 18.3081 23.8118C18.1742 23.8118 17.9456 23.5987 17.7852 23.4385L14.5622 20.2152C14.0641 19.7172 14.0641 19.668 14.5622 19.17L19.5302 14.202L23.4141 14.5863L23.7987 18.4703L18.8304 23.4385Z" fill="black"/>
      <path d="M17.0064 17.5826L15.4914 19.0974C15.1089 19.4799 15.0039 19.7392 15.4419 20.1772C15.4744 20.2097 15.5171 20.2261 15.5597 20.2261C15.6024 20.2261 15.6451 20.2097 15.6776 20.1772C15.7427 20.1121 15.7427 20.0069 15.6776 19.9416C15.4164 19.6804 15.4196 19.6407 15.7271 19.3331L17.2421 17.8182C17.3072 17.7531 17.3072 17.6477 17.2421 17.5826C17.1769 17.5174 17.0716 17.5174 17.0064 17.5826Z" fill="black"/>
      <path d="M17.4811 17.1081L17.3456 17.2438C17.2806 17.309 17.2806 17.4145 17.3459 17.4795C17.3784 17.5118 17.4209 17.5281 17.4636 17.5281C17.5063 17.5281 17.5489 17.512 17.5816 17.4791L17.7171 17.3435C17.7821 17.2783 17.7821 17.1728 17.7168 17.1078C17.6516 17.043 17.5463 17.0426 17.4811 17.1081Z" fill="black"/>
      <path d="M21.4329 15.1436C20.6711 15.1436 20.0508 15.7636 20.0508 16.5256C20.0508 17.2876 20.6711 17.9076 21.4329 17.9076C22.1951 17.9076 22.8148 17.2876 22.8148 16.5256C22.8148 15.7636 22.1949 15.1436 21.4329 15.1436ZM21.4329 17.2409C21.0384 17.2409 20.7174 16.9199 20.7174 16.5256C20.7174 16.1312 21.0384 15.8102 21.4329 15.8102C21.8278 15.8102 22.1481 16.1312 22.1481 16.5256C22.1481 16.9199 21.8274 17.2409 21.4329 17.2409Z" fill="black"/>
      </g>
      <defs>
      <clipPath id="clip0_873_22247">
      <rect width="12" height="12" fill="white" transform="translate(13 13)"/>
      </clipPath>
      </defs>
    `)
  shape.classed('cursor-pointer', true)
  shape.classed('opacity-15', !data.payload.selected)
  const boundingBox = TemplateAPI.Shape.getBBox(shape)
  const titleYPosition = data.payload.titleUp ? 1.7 : -0.25
  const titleShape = TemplateAPI.TextCollection(
    data.payload?.title ?? '',
    TemplateAPI.CollectionStyle(
      50,
      boundingBox.width * 2.5,
      boundingBox.width * -0.75,
      boundingBox.height * titleYPosition,
      4,
      20,
      4,
      TemplateAPI.Alignment.Center
    ),
    [
      TemplateAPI.ShapeStyle('class', 'gly_text.light'),
      TemplateAPI.ShapeStyle('font-size', '1em'),
    ]
  )
  shape.append(() => titleShape.node())


  return shape
}
