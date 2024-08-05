<template>
  <q-page padding class="flex-center row">
    <div class="pathway__creator__wrapper relative-position col-10 bg-black cut--2--large flex flex-center"
      style="height: 500px">
      <GraphlyD3 class="absolute horse" ref="graphly" :draggableNodes="true" :zoom-scale-extent="[1, 1]"
        :zoomEnabled="true" @node-click="handleNodeClick" @node-drag-end="handleNodeDrag"
        @environment-click="handleEnvClick" />
    </div>
    <q-dialog v-model="rightModal" seamless position="right">
      <q-card square class="bg-grey-5 cut--3" style="width: 600px">
        <q-card-section class="q-pt-sm">
          <div class="col-12 q-mb-md">
            <div class="row justify-between items-center">
              <div class="col-auto">
                <p class="q-mb-none">
                  {{ selectedNode.payload.title }} Settings
                </p>
              </div>
              <div class="col-auto">
                <q-btn flat round dense size="sm" icon="close" v-close-popup />
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <q-form ref="nodeManagementForm">
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <div>
                        <p>Metric</p>
                        <q-select :model-value="selectedNode.payload.title" filled class="input-cut" bg-color="white"
                          color="red" transition-show="jump-up" transition-hide="jump-up" :options="metrics" dense
                          option-value="id" option-label="name" @update:model-value="handleMetricSelect($event)">
                          <template v-slot:selected-item="scope">
                            <template v-if="scope.opt.name">
                              {{ scope.opt.name }}
                            </template>
                            <template v-else>
                              <span class="text-grey-14">Choose an option</span>
                            </template>
                          </template>
                          <template v-slot:option="scope">
                            <q-item class="select-option-gradient text-white" v-bind="scope.itemProps">
                              <q-item-section>
                                <q-item-label class="text-capitalize">{{
        scope.opt.name
      }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="col-12">
                      <q-checkbox :model-value="selectedNode.payload.blankNode" filled class="input-cut"
                        bg-color="white" color="red" dense label="Blank Node"
                        @update:model-value="handleBlankNode($event)">
                      </q-checkbox>
                    </div>
                    <div class="col-6">
                      <div>
                        <p>Parent(s)</p>
                        <q-select :model-value="selectedNode.parents" filled class="input-cut" bg-color="white"
                          color="red" multiple transition-show="jump-up" transition-hide="jump-up" :options="graph.nodes.filter(
        (node) => node.id !== selectedNode.id
      )
        " dense emit-value :option-value="(node: { payload: { title: any; }; id: any; } | null) =>
        node === null
          ? null
          : { title: node.payload.title, id: node.id }
        " map-options @update:model-value="handleNodeParentSelect($event)">
                          <template v-slot:selected>
                            <template v-if="selectedNode.parents &&
        selectedNode.parents.length > 0
        ">
                              <span v-for="(parent, index) in selectedNode.parents" :key="index">
                                {{ index > 0 ? ', ' : '' }}
                                {{ parent.title }}
                              </span>
                            </template>
                            <template v-else>
                              <span class="text-grey-14">Choose an option</span>
                            </template>
                          </template>
                          <template v-slot:option="scope">
                            <q-item class="select-option-gradient text-white" v-bind="scope.itemProps">
                              <q-item-section>
                                <q-item-label class="text-capitalize">{{
        scope.opt.payload.title
      }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div>
                        <p>Children</p>
                        <q-select :model-value="selectedNode.children" filled class="input-cut" bg-color="white"
                          color="red" multiple transition-show="jump-up" transition-hide="jump-up" :options="graph.nodes.filter(
        (node) => node.id !== selectedNode.id
      )
        " dense emit-value :option-value="(node: { payload: { title: any; }; id: any; } | null) =>
        node === null
          ? null
          : { title: node.payload.title, id: node.id }
        " map-options @update:model-value="handleNodeChildrenSelect($event)">
                          <template v-slot:selected>
                            <template v-if="selectedNode.children &&
        selectedNode.children.length > 0
        ">
                              <span v-for="(child, index) in selectedNode.children" :key="index">
                                {{ index > 0 ? ', ' : '' }}
                                {{ child.title }}
                              </span>
                            </template>
                            <template v-else>
                              <span class="text-grey-14">Choose an option</span>
                            </template>
                          </template>
                          <template v-slot:option="scope">
                            <q-item class="select-option-gradient text-white" v-bind="scope.itemProps">
                              <q-item-section>
                                <q-item-label class="text-capitalize">{{
                                  scope.opt.payload.title
                                  }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="col-12 q-mt-md text-right">
                      <q-btn label="Delete Node" unelevated text-color="black" class="cut--1" color="red"
                        @click="handleNodeDelete" />
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue'
import { ForceSimulation, Graph, D3Node, Node } from '@livereader/graphly-d3'
import GraphlyD3 from '@livereader/graphly-d3/component/vue3'
import '@livereader/graphly-d3/style.css'
import Circle from './circle'
import LogShape from 'components/pathFinder/svgShapes/Log'
import StartingLevel from 'components/pathFinder/svgShapes/StartingLevel'
import MidLevel from 'components/pathFinder/svgShapes/MidLevel'
import EndLevel from 'components/pathFinder/svgShapes/EndLevel'
import Blank from 'components/pathFinder/svgShapes/Blank'

const graphly = ref(null)
const selectedNode = ref(<null | any>null)
const rightModal = ref(false)
const nodeManagementForm = ref(null)
const simulation = computed<ForceSimulation>(() => graphly.value.simulation)

type ExtendedNode = D3Node &
  Node & {
    parents: { id: string; title: string }[]; // Replace with the appropriate type for parents
    children: { id: string; title: string }[]; // Replace with the appropriate type for children
  };

type ExtendedGraph = Omit<Graph, 'nodes'> & {
  nodes: ExtendedNode[];
};

const metrics = ref([
  {
    id: 1,
    name: 'Log',
    type: 'log'
  },
  {
    id: 2,
    name: 'First Call',
    type: 'startingLevel'
  },
  {
    id: 3,
    name: 'Second Call',
    type: 'startingLevel'
  },
  {
    id: 4,
    name: 'Inbounddd',
    type: 'midLevel'
  },
  {
    id: 5,
    name: 'Outbound',
    type: 'midLevel'
  },
  {
    id: 6,
    name: 'Second Call Booked',
    type: 'endLevel'
  },
  {
    id: 7,
    name: 'Offer Made',
    type: 'endLevel'
  },
  {
    id: 8,
    name: 'No Show',
    type: 'endLevel'
  },
])

const graph: ExtendedGraph = {
  nodes: [
    {
      id: 'node1',
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
        title: 'First Call',
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
        title: 'Second Call',
        bgColor: '#ff0000',
        borderColor: '#ff0000',
        last: false,
      },
    },
    {
      id: 'node2',
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
      id: 'node3',
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
      id: 'node4',
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
      id: 'node5',
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
      id: 'node6',
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
      id: 'node7',
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
      id: 'node8',
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
      id: 'node9',
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
      id: 'node10',
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
      'source': 'node1',
      'target': 'nodeBlank1',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank1',
      'target': 'nodeBlank2',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank1',
      'target': 'nodeBlank3',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank2',
      'target': 'node2',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank3',
      'target': 'node3',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node2',
      'target': 'nodeBlank4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node3',
      'target': 'nodeBlank4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank4',
      'target': 'nodeBlank5',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank5',
      'target': 'nodeBlank6',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank5',
      'target': 'nodeBlank7',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank7',
      'target': 'node4',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node4',
      'target': 'node5',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'nodeBlank6',
      'target': 'node6',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node6',
      'target': 'node7',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node7',
      'target': 'node8',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node8',
      'target': 'node9',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
    {
      'source': 'node9',
      'target': 'node10',
      'directed': false,
      'strength': 'strong',
      'curvature': 0,
      'padding': 1,
      'color': '#D74B4B'
    },
  ],
}

const handleBlankNode = (val) => {
  selectedNode.value.payload.blankNode = val
}

const handleEnvClick = (event: any, position: { x: number; y: number }) => {
  const nodesLength = graph.nodes.length
  graph.nodes.push({
    id: `node${nodesLength + 1}`,
    shape: {
      type: 'circle',
      scale: 1,
    },
    parents: [],
    children: [],
    anchor: {
      type: 'hard',
      x: position.x,
      y: position.y,
    },
    payload: {
      blankNode: false,
      title: '',
      bgColor: '#ff0000',
      borderColor: '#ff0000',
      last: false,
    },
  })
  rightModal.value = true
  // Set selectedNode to the new added node, which is always the last one?
  selectedNode.value = graph.nodes.find(
    (n) => n.id === graph.nodes[nodesLength].id
  )
  simulation.value.render(graph)
}

const handleNodeClick = (_e: unknown, d: { id: string }) => {
  rightModal.value = true
  selectedNode.value = graph.nodes.find((n) => n.id === d.id)
}

const handleMetricSelect = (val: { name: string, type: string }) => {

  selectedNode.value.payload.title = val.name
  selectedNode.value.shape.type = val.type

  simulation.value.render(graph)
}

const addLink = (sourceId: string, targetId: string) => {
  graph.links.push({
    source: sourceId,
    target: targetId,
    directed: false,
    strength: 'strong',
    curvature: 0,
    padding: 1,
  })
}

const removeLink = (sourceId: string, targetId: string) => {
  const linkIndex = graph.links.findIndex(
    (link) =>
      (link.source.id === sourceId && link.target.id === targetId) ||
      (link.source.id === targetId && link.target.id === sourceId)
  )
  if (linkIndex !== -1) {
    graph.links.splice(linkIndex, 1)
  }
}

const addChild = (parentId: string, child: { id: string; title: string }) => {
  const parentNode = graph.nodes.find((node) => node.id === parentId)
  if (parentNode) {
    parentNode.children = parentNode.children || []
    parentNode.children.push(child)
  }
}

const removeChild = (parentId: string, childId: string) => {
  const parentNode = graph.nodes.find((node) => node.id === parentId)
  if (parentNode && parentNode.children) {
    parentNode.children = parentNode.children.filter(
      (child: { id: string }) => child.id !== childId
    )
  }
}

const handleNodeParentSelect = (val: any[]) => {
  const newParents = val.map((obj) => toRaw(obj))
  const removedParents = selectedNode.value.parents.filter(
    (parent: { id: string }) =>
      !newParents.some((newParent) => newParent.id === parent.id)
  )
  const addedParents = newParents.filter(
    (parent) =>
      !selectedNode.value.parents.some(
        (oldParent: { id: string }) => oldParent.id === parent.id
      )
  )

  selectedNode.value.parents = newParents

  removedParents.forEach((parent: { id: string }) => {
    removeLink(selectedNode.value.id, parent.id)
    removeChild(parent.id, selectedNode.value.id)
  })

  addedParents.forEach((parent) => {
    addLink(selectedNode.value.id, parent.id)
    addChild(parent.id, {
      id: selectedNode.value.id,
      title: selectedNode.value.payload.title,
    })
  })

  simulation.value.render(graph)
}

// Adds a child and updates the child's parents array
const addChildSelection = (childId: string, parentId: string) => {
  addLink(parentId, childId)
  const childNode = graph.nodes.find((node) => node.id === childId)
  if (childNode) {
    childNode.parents = childNode.parents || []
    childNode.parents.push({
      id: parentId,
      title: graph.nodes.find((node) => node.id === parentId)?.payload.title,
    })
  }
}

// Removes a child and updates the child's parents array
const removeChildSelection = (childId: string, parentId: any) => {
  removeLink(parentId, childId)
  const childNode = graph.nodes.find((node) => node.id === childId)
  if (childNode && childNode.parents) {
    childNode.parents = childNode.parents.filter(
      (parent: { id: any }) => parent.id !== parentId
    )
  }
}

// Handles the selection of children nodes
const handleNodeChildrenSelect = (val: any[]) => {
  const newChildren = val.map((obj) => toRaw(obj))
  const removedChildren = selectedNode.value.children.filter(
    (child: { id: string }) =>
      !newChildren.some((newChild) => newChild.id === child.id)
  )
  const addedChildren = newChildren.filter(
    (child) =>
      !selectedNode.value.children.some(
        (oldChild: { id: string }) => oldChild.id === child.id
      )
  )

  selectedNode.value.children = newChildren

  removedChildren.forEach((child: { id: string }) => {
    removeChildSelection(child.id, selectedNode.value.id)
  })

  addedChildren.forEach((child) => {
    addChildSelection(child.id, selectedNode.value.id)
  })

  simulation.value.render(graph)
}
// const handleNodeParentSelect = (val: any[]) => {
//   const parents = val.map((obj) => toRaw(obj));
//   selectedNode.value.parents = parents;
//   recalculateLinks(parents);
// };

// TODO: Check if target node already has a link, if it does, show a warning. Not sure if we should do this :/

// TODO: implement functionality so that node gets opacity lowered when dragging

const handleNodeDrag = (
  _event: unknown,
  node: { id: string },
  position: { x: number; y: number }
) => {
  selectedNode.value = graph.nodes.find((n) => n.id === node.id)
  selectedNode.value.anchor.x = position.x
  selectedNode.value.anchor.y = position.y
}

const handleNodeDelete = () => {
  const index = graph.nodes.findIndex(
    (node) => node.id === selectedNode.value.id
  )
  if (index > -1) {
    graph.nodes.splice(index, 1)
  }
  // TODO handle scenario where deleted node has parents and children
  rightModal.value = false
  simulation.value.render(graph)
}

onMounted(() => {
  // TODO implement scrollToNodes functionality
  simulation.value.templateStore.add('circle', Circle)
  simulation.value.templateStore.add('log', LogShape)
  simulation.value.templateStore.add('startingLevel', StartingLevel)
  simulation.value.templateStore.add('midLevel', MidLevel)
  simulation.value.templateStore.add('endLevel', EndLevel)
  simulation.value.templateStore.add('blank', Blank)
  simulation.value.render(graph)
})
</script>

<style lang="scss">
/* svg .gly-node {
  stroke-width: 0;
} */
// .horse {
//   background-size: 40px 40px;
//   background-image: radial-gradient(circle, #474747 1px, rgba(0, 0, 0, 0) 1px);
//   background-position: center center;
// }</style>
