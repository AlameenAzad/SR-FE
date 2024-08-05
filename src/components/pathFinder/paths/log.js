let logPath = {
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
        title: 'blank2',
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
        title: 'blank3',
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
        selected: false,
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
        selected: false,
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
        title: 'blank4',
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
        y: 60,
      },
      payload: {
        blankNode: false,
        title: 'Inbound',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
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
        x: 500,
        y: 60,
      },
      payload: {
        blankNode: false,
        title: 'blank7',
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
        x: 350,
        y: -50,
      },
      payload: {
        blankNode: false,
        title: 'Outbound',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'nodeBlank9',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 500,
        y: -50,
      },
      payload: {
        blankNode: false,
        title: '',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
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
        x: 140,
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
        x: 140,
        y: 60,
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
      id: 'nodeBlank8',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 350,
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
      id: 'nodeBlank10',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 500,
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
      id: 'nodeBlank11',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 500,
        y: 120,
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
      id: 'nodeBlank12',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 500,
        y: -120,
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
      id: 'secondCallBooked',
      shape: {
        type: 'endLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 630,
        y: 120,
      },
      payload: {
        blankNode: false,
        title: 'Second Call Booked',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'offerMade',
      shape: {
        type: 'endLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 700,
        y: 0,
      },
      payload: {
        blankNode: false,
        title: 'Offer Made',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'noShow',
      shape: {
        type: 'endLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 600,
        y: -120,
      },
      payload: {
        blankNode: false,
        title: 'No Show',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'nodeBlank13',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 800,
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
      id: 'nodeBlank14',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 800,
        y: -100,
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
      id: 'nodeBlank15',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 800,
        y: 100,
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
      id: 'Sale',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 900,
        y: 0,
      },
      payload: {
        blankNode: false,
        title: 'Sale',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'offerSecondCallBooked',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 900,
        y: 100,
      },
      payload: {
        blankNode: false,
        title: 'Second Call Booked',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'lost',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 900,
        y: -100,
      },
      payload: {
        blankNode: false,
        title: 'Lost',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'nodeBlank19',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1100,
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
      id: 'offerInbound',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1100,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'Inbound',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'offerOutbound',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1100,
        y: -70,
      },
      payload: {
        blankNode: false,
        title: 'Outbound',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'inboundProductSelect',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1250,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'Product Select',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'inboundCashPlan',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1400,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'Cash Plan',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'nodeBlank23',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1550,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'nodeBlank23',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'nodeBlank24',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1550,
        y: -20,
      },
      payload: {
        blankNode: false,
        title: 'nodeBlank24',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'nodeBlank25',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1650,
        y: -20,
      },
      payload: {
        blankNode: false,
        title: 'nodeBlank25',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'nodeBlank26',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1650,
        y: -140,
      },
      payload: {
        blankNode: false,
        title: 'nodeBlank26',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'nodeBlank27',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1650,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'nodeBlank27',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'assignSelf',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1250,
        y: -70,
      },
      payload: {
        blankNode: false,
        title: 'Assign Self',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
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
        x: 1250,
        y: -200,
      },
      payload: {
        blankNode: false,
        title: 'Assign Setter',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: false,
        selected: false,
      },
    },
    {
      id: 'nodeBlank20',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1150,
        y: -70,
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
      id: 'nodeBlank21',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1150,
        y: -200,
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
      id: 'nodeBlank22',
      shape: {
        type: 'blank',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1250,
        y: -140,
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
      id: 'outboundProductSelect',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1400,
        y: -140,
      },
      payload: {
        blankNode: false,
        title: 'Product Select',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'outboundCashPlan',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1550,
        y: -140,
      },
      payload: {
        blankNode: false,
        title: 'Cash Plan',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'wire',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1800,
        y: -140,
      },
      payload: {
        blankNode: false,
        title: 'wire',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'creditCard',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1800,
        y: -20,
      },
      payload: {
        blankNode: false,
        title: 'Credit Card',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'layWay',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1800,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'Layway',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'layWayAccount',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1950,
        y: 70,
      },
      payload: {
        blankNode: false,
        title: 'Account',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'wireAccount',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1950,
        y: -140,
      },
      payload: {
        blankNode: false,
        title: 'Account',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
      },
    },
    {
      id: 'ccAccount',
      shape: {
        type: 'midLevel',
        scale: 1,
      },
      parents: [],
      children: [],
      anchor: {
        type: 'hard',
        x: 1950,
        y: -20,
      },
      payload: {
        blankNode: false,
        title: 'Account',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
        titleUp: true,
        selected: false,
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
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank1',
      'target': 'nodeBlank2',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank1',
      'target': 'nodeBlank3',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank2',
      'target': 'firstCall',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank3',
      'target': 'secondCall',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'firstCall',
      'target': 'nodeBlank4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'secondCall',
      'target': 'nodeBlank4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank4',
      'target': 'nodeBlank5',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank5',
      'target': 'nodeBlank6',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#FCC330'
    },
    {
      'source': 'nodeBlank6',
      'target': 'inbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#FCC330'
    },
    {
      'source': 'nodeBlank8',
      'target': 'outbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#FCC330'
    },
    {
      'source': 'nodeBlank4',
      'target': 'nodeBlank8',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#FCC330'
    },
    {
      'source': 'inbound',
      'target': 'nodeBlank7',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#FCC330'
    },
    {
      'source': 'outbound',
      'target': 'nodeBlank9',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#FCC330'
    },
    {
      'source': 'nodeBlank9',
      'target': 'nodeBlank10',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank7',
      'target': 'nodeBlank10',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank7',
      'target': 'nodeBlank11',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank9',
      'target': 'nodeBlank12',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank12',
      'target': 'noShow',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank10',
      'target': 'offerMade',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank11',
      'target': 'secondCallBooked',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'offerMade',
      'target': 'nodeBlank13',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank13',
      'target': 'nodeBlank14',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank13',
      'target': 'nodeBlank15',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank13',
      'target': 'Sale',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank15',
      'target': 'offerSecondCallBooked',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank14',
      'target': 'lost',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'Sale',
      'target': 'nodeBlank19',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank19',
      'target': 'offerInbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank19',
      'target': 'offerOutbound',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'offerInbound',
      'target': 'inboundProductSelect',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'inboundProductSelect',
      'target': 'inboundCashPlan',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'inboundCashPlan',
      'target': 'nodeBlank23',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank23',
      'target': 'nodeBlank24',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'offerOutbound',
      'target': 'nodeBlank20',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank20',
      'target': 'assignSelf',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank20',
      'target': 'nodeBlank21',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank21',
      'target': 'assignSetter',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'assignSetter',
      'target': 'nodeBlank22',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'assignSelf',
      'target': 'nodeBlank22',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    // {
    //   'source': 'offerInbound',
    //   'target': 'inboundProductSelect',
    //   'directed': false,
    //   'strength': 'strong',
    //   'curvature': 0,
    //   'padding': 0,
    //   'width': 0,
    //   'color': '#3CB63A'
    // },
    // {
    //   'source': 'inboundProductSelect',
    //   'target': 'inboundCashPlan',
    //   'directed': false,
    //   'strength': 'strong',
    //   'curvature': 0,
    //   'padding': 0,
    //   'width': 0,
    //   'color': '#3CB63A'
    // },
    // {
    //   'source': 'inboundCashPlan',
    //   'target': 'inboundAccount',
    //   'directed': false,
    //   'strength': 'strong',
    //   'curvature': 0,
    //   'padding': 0,
    //   'width': 0,
    //   'color': '#3CB63A'
    // },
    {
      'source': 'nodeBlank22',
      'target': 'outboundProductSelect',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'outboundProductSelect',
      'target': 'outboundCashPlan',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'outboundCashPlan',
      'target': 'nodeBlank24',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank24',
      'target': 'nodeBlank25',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank25',
      'target': 'nodeBlank26',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank25',
      'target': 'nodeBlank27',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank26',
      'target': 'wire',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank25',
      'target': 'creditCard',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'nodeBlank27',
      'target': 'layWay',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'wire',
      'target': 'wireAccount',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'creditCard',
      'target': 'ccAccount',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },
    {
      'source': 'layWay',
      'target': 'layWayAccount',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 0,
      'width': 0,
      'color': '#3CB63A'
    },

  ],
}

const logChoices = [
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
      title: 'Outbound',
      picked: false,
      index: 1,
      route: {
        firstCall: [
          'outbound',
          'nodeBlank8',
          'nodeBlank4',
          'firstCall'
        ],
        secondCall: [
          'outbound',
          'nodeBlank8',
          'nodeBlank4',
          'secondCall'
        ]
      }
    },
    {
      title: 'Inbound',
      picked: false,
      index: 1,
      route: {
        firstCall: [
          'inbound',
          'nodeBlank6',
          'nodeBlank5',
          'nodeBlank4',
          'firstCall'
        ],
        secondCall: [
          'inbound',
          'nodeBlank6',
          'nodeBlank5',
          'nodeBlank4',
          'secondCall'
        ]
      }
    },
  ],
  [
    {
      title: 'No Show',
      picked: false,
      index: 2,
      end: true,
      route: {
        outbound: [
          'noShow',
          'nodeBlank12',
          'nodeBlank9',
          'outbound',
        ],
        inbound: [
          'noShow',
          'nodeBlank12',
          'nodeBlank9',
          'nodeBlank10',
          'nodeBlank7',
          'inbound'
        ]
      }
    },
    {
      title: 'Offer Made',
      picked: false,
      index: 2,
      end: false,
      route: {
        outbound: [
          'offerMade',
          'nodeBlank10',
          'nodeBlank9',
          'outbound',
        ],
        inbound: [
          'offerMade',
          'nodeBlank10',
          'nodeBlank7',
          'inbound'
        ]
      }
    },
    {
      title: 'Second Call Booked',
      picked: false,
      end: true,
      index: 2,
      route: {
        outbound: [
          'secondCallBooked',
          'nodeBlank11',
          'nodeBlank7',
          'nodeBlank10',
          'nodeBlank9',
          'outbound',
        ],
        inbound: [
          'secondCallBooked',
          'nodeBlank11',
          'nodeBlank7',
          'inbound'
        ]
      }
    },
  ],
  [
    {
      title: 'Sale',
      picked: false,
      end: false,
      index: 3,
      route: {
        offerMade: [
          'Sale',
          'nodeBlank13',
          'offerMade',
        ]
      }
    },
    {
      title: 'Second Call Booked',
      picked: false,
      end: true,
      index: 3,
      route: {
        offerMade: [
          'offerSecondCallBooked',
          'nodeBlank15',
          'nodeBlank13',
          'offerMade',
        ]
      }
    },
    {
      title: 'Lost',
      picked: false,
      end: true,
      index: 3,
      route: {
        offerMade: [
          'lost',
          'nodeBlank14',
          'nodeBlank13',
          'offerMade',
        ]
      }
    },
  ],
  [
    {
      title: 'Inbound',
      id: 'offerInbound',
      picked: false,
      end: false,
      index: 4,
      route: {
        Sale: [
          'offerInbound',
          'nodeBlank19',
          'Sale',
        ],
      },
      child: [
        {
          title: 'Product Select',
          id: 'inboundProductSelect',
          picked: false,
          end: false,
          index: 4,
          route: {
            offerInbound: [
              'inboundProductSelect',
              'offerInbound',
            ],
          },
          child: [
            {
              title: 'Cash Plan',
              id: 'inboundCashPlan',
              hasInput: 'productSelect',
              picked: false,
              end: false,
              index: 4,
              route: {
                inboundProductSelect: [
                  'inboundCashPlan',
                  'inboundProductSelect',
                ],
              },
              // child: [
              //   {
              //     title: 'Account',
              //     id: 'inboundAccount',
              //     hasInput: 'cashPlan',
              //     picked: false,
              //     end: true,
              //     index: 3,
              //     route: {
              //       inboundCashPlan: [
              //         'inboundAccount',
              //         'inboundCashPlan',
              //       ],
              //     },
              //     child: [
              //       {
              //         title: 'Save',
              //         id: 'inboundSaveAccount',
              //         picked: false,
              //         end: true,
              //         index: 3,
              //         route: {
              //           inboundAccount: [
              //             'inboundSaveAccount',
              //             'inboundAccount',
              //           ],
              //         },
              //       }
              //     ]
              //   }
              // ]
            },
          ]
        }
      ]
    },
    {
      title: 'Outbound',
      id: 'offerOutbound',
      picked: false,
      end: false,
      index: 4,
      route: {
        Sale: [
          'offerOutbound',
          'nodeBlank19',
          'Sale',
        ]
      },
      child: [
        {
          title: 'Assign Self',
          picked: false,
          end: false,
          index: 4,
          class: 'hidden',
          route: {
            offerOutbound: [
              'assignSelf',
              'nodeBlank20',
              'offerOutbound',
            ]
          },
          child: [
            {
              title: 'Product Select',
              id: 'outboundProductSelect',
              picked: false,
              end: false,
              index: 4,
              route: {
                assignSelf: [
                  'outboundProductSelect',
                  'nodeBlank22',
                  'assignSelf',
                ]
              },
              child: [
                {
                  title: 'Cash Plan',
                  id: 'outboundCashPlan',
                  picked: false,
                  end: false,
                  hasInput: 'productSelect',
                  index: 4,
                  route: {
                    outboundProductSelect: [
                      'outboundCashPlan',
                      'outboundProductSelect',
                    ]
                  },
                  // child: [
                  //   {
                  //     title: 'Account',
                  //     id: 'outboundAccount',
                  //     hasInput: 'cashPlan',
                  //     picked: false,
                  //     end: true,
                  //     index: 3,
                  //     route: {
                  //       outboundCashPlan: [
                  //         'outboundAccount',
                  //         'outboundCashPlan',
                  //       ]
                  //     },
                  //     child: [
                  //       {
                  //         title: 'Save',
                  //         id: 'outboundSaveAccount',
                  //         picked: false,
                  //         end: true,
                  //         index: 3,
                  //         route: {
                  //           outboundAccount: [
                  //             'outboundSaveAccount',
                  //             'outboundAccount',
                  //           ],
                  //         },
                  //       }
                  //     ]
                  //   }
                  // ]
                }
              ]
            }
          ]
        },
        {
          title: 'Assign Setter',
          picked: false,
          end: false,
          hasInput: 'assignSetter',
          index: 4,
          route: {
            offerOutbound: [
              'assignSetter',
              'nodeBlank21',
              'nodeBlank20',
              'offerOutbound',
            ]
          },
          child: [
            {
              title: 'Product Select',
              id: 'outboundProductSelect',
              hasInput: 'productSelect',
              picked: false,
              end: false,
              index: 4,
              route: {
                assignSetter: [
                  'outboundProductSelect',
                  'nodeBlank22',
                  'assignSetter',
                ]
              },
              child: [
                {
                  title: 'Cash Plan',
                  id: 'outboundCashPlan',
                  picked: false,
                  end: false,
                  index: 4,
                  route: {
                    outboundProductSelect: [
                      'outboundCashPlan',
                      'outboundProductSelect',
                    ]
                  },
                  // child: [
                  //   {
                  //     title: 'Account',
                  //     id: 'outboundAccount',
                  //     picked: false,
                  //     end: true,
                  //     index: 3,
                  //     route: {
                  //       outboundCashPlan: [
                  //         'outboundAccount',
                  //         'outboundCashPlan',
                  //       ]
                  //     },
                  //   }
                  // ]
                }
              ]
            }
          ]
        },
      ]
    },
  ],
  [
    {
      title: 'Wire',
      id: 'wire',
      picked: false,
      index: 5,
      hasInput: 'cashPlan',
      end: false,
      route: {
        outboundCashPlan: [
          'wire',
          'nodeBlank26',
          'nodeBlank25',
          'nodeBlank24',
          'outboundCashPlan',
        ],
        inboundCashPlan: [
          'wire',
          'nodeBlank26',
          'nodeBlank25',
          'nodeBlank24',
          'nodeBlank23',
          'inboundCashPlan',
        ]
      },
      child: [
        {
          title: 'Account',
          id: 'wireAccount',
          picked: false,
          end: true,
          index: 5,
          route: {
            wire: [
              'wireAccount',
              'wire',
            ]
          },
        },
      ]
    },
    {
      title: 'Credit Card',
      id: 'creditCard',
      hasInput: 'cashPlan',
      picked: false,
      index: 5,
      end: false,
      route: {
        outboundCashPlan: [
          'creditCard',
          'nodeBlank25',
          'nodeBlank24',
          'outboundCashPlan',
        ],
        inboundCashPlan: [
          'creditCard',
          'nodeBlank25',
          'nodeBlank24',
          'nodeBlank23',
          'inboundCashPlan',
        ]
      },
      child: [
        {
          title: 'Account',
          id: 'ccAccount',
          picked: false,
          end: true,
          index: 5,
          route: {
            creditCard: [
              'ccAccount',
              'creditCard',
            ]
          },
        },
      ]
    },
    {
      title: 'Layway',
      id: 'layWay',
      hasInput: 'cashPlan',
      picked: false,
      end: false,
      index: 5,
      route: {
        outboundCashPlan: [
          'layWay',
          'nodeBlank27',
          'nodeBlank25',
          'nodeBlank24',
          'outboundCashPlan',
        ],
        inboundCashPlan: [
          'layWay',
          'nodeBlank27',
          'nodeBlank25',
          'nodeBlank24',
          'nodeBlank23',
          'inboundCashPlan',
        ]
      },
      child: [
        {
          title: 'Account',
          id: 'layWayAccount',
          picked: false,
          end: true,
          index: 5,
          route: {
            layWay: [
              'layWayAccount',
              'layWay',
            ]
          },
        },
      ]
    },
  ],
]

export { logPath, logChoices }
