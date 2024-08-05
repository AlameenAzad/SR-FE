let saleLogPath = {
  nodes: [
    {
      id: 'log',
      shape: {
        type: 'log',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: -200,
        y: 0,
      },
      payload: {
        blankNode: false,
        title: 'Log',
        last: false,
        titleUp: false,
      },
    },
    {
      id: 'nodeBlank1',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: -100,
        y: 0,
      },
      payload: {
        blankNode: false,
        title: 'blank1',
        last: false,
      },
    },
    {
      id: 'nodeBlank2',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: -100,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'nodeBlank3',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: -100,
        y: -80,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'firstCall',
      shape: {
        type: 'startingLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 40,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: 'First Call',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
    {
      id: 'secondCall',
      shape: {
        type: 'startingLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 40,
        y: -80,
      },
      payload: {
        blankNode: false,
        title: 'Second Call',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
      },
    },
    {
      id: 'nodeBlank4',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 40,
        y: 0,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'nodeBlank5',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 120,
        y: 0,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'nodeBlank6',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 120,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'nodeBlank7',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 120,
        y: -80,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'inbound',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 300,
        y: -80,
      },
      payload: {
        blankNode: false,
        title: 'Inbound',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
    {
      id: 'productSelect',
      shape: {
        type: 'endLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 450,
        y: -80,
      },
      payload: {
        blankNode: false,
        title: 'Product Select',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
    {
      id: 'outbound',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 300,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: 'Outbound',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
    {
      id: 'productSelectOutbound',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 450,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: 'Product Select',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
    {
      id: 'cashPlan',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 550,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: 'Cash Plan',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
    {
      id: 'assignSetter',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 650,
        y: 80,
      },
      payload: {
        blankNode: false,
        title: 'Assign Setter',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
      },
    },
    {
      id: 'assignSelf',
      shape: {
        type: 'endLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 650,
        y: 160,
      },
      payload: {
        blankNode: false,
        title: 'Assign Self',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
      },
    },
  ],
  links: [
    {
      'source': 'log',
      'target': 'nodeBlank1',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank1',
      'target': 'nodeBlank2',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank1',
      'target': 'nodeBlank3',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank2',
      'target': 'firstCall',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank3',
      'target': 'secondCall',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'firstCall',
      'target': 'nodeBlank4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'secondCall',
      'target': 'nodeBlank4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank4',
      'target': 'nodeBlank5',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank5',
      'target': 'nodeBlank6',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank5',
      'target': 'nodeBlank7',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank7',
      'target': 'inbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'inbound',
      'target': 'productSelect',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank6',
      'target': 'outbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'outbound',
      'target': 'productSelectOutbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'productSelectOutbound',
      'target': 'cashPlan',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'cashPlan',
      'target': 'assignSetter',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'assignSetter',
      'target': 'assignSelf',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'width': 0,
      'color': '#D74B4B'
    },
  ],
}

const saleLogChoices = [
  [
    {
      title: 'First Call',
      picked: false,
      index: 0,
      route: {
        log: [
          'firstCall',
          'nodeBlank2',
          'nodeBlank1',
          'log'
        ]
      }
    },
    {
      title: 'Second Call',
      picked: false,
      index: 0,
      route: {
        log: [
          'secondCall',
          'nodeBlank3',
          'nodeBlank1',
          'log'
        ]
      }
    },
  ],
  [
    {
      title: 'Inbound',
      picked: false,
      index: 1,
      route: {
        secondCall: [
          'inbound',
          'nodeBlank7',
          'nodeBlank5',
          'nodeBlank4',
          'secondCall'
        ],
        firstCall: [
          'inbound',
          'nodeBlank7',
          'nodeBlank5',
          'nodeBlank4',
          'firstCall'
        ]
      },
      child: [
        {
          title: 'Product Select',
          picked: false,
          index: 0,
          route: {
            inbound: [
              'productSelect',
              'inbound'
            ]
          },
          hasInput: 'productSelect',
          end: true
        }
      ]
    },
    {
      title: 'Outbound',
      picked: false,
      index: 1,
      route: {
        secondCall: [
          'outbound',
          'nodeBlank6',
          'nodeBlank5',
          'nodeBlank4',
          'secondCall'
        ],
        firstCall: [
          'outbound',
          'nodeBlank6',
          'nodeBlank5',
          'nodeBlank4',
          'firstCall'
        ]
      },
      child: [
        {
          title: 'Product Select',
          id: 'productSelectOutbound',
          picked: false,
          index: 0,
          hasInput: 'productSelect',
          route: {
            outbound: [
              'productSelectOutbound',
              'outbound'
            ]
          },
          child: [
            {
              title: 'Cash Plan',
              picked: false,
              index: 0,
              hasInput: 'cashPlan',
              route: {
                productSelectOutbound: [
                  'cashPlan',
                  'productSelectOutbound'
                ]
              },
              child: [
                {
                  title: 'Assign Setter',
                  picked: false,
                  index: 0,
                  hasInput: 'assignSetter',
                  route: {
                    cashPlan: [
                      'assignSetter',
                      'cashPlan'
                    ]
                  },
                  child: [
                    {
                      title: 'Assign Self',
                      picked: false,
                      index: 0,
                      route: {
                        assignSetter: [
                          'assignSelf',
                          'assignSetter'
                        ]
                      },
                      end: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
  ],
]

export { saleLogPath, saleLogChoices}
