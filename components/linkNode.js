Vue.component('link-node', {
    template: `<g :transform="rootTransform">
            <rect :width="nodeWidth" :height="nodeHeight" :fill="nodeFill"></rect>
            <text :fill="nodeTextColor" text-anchor="middle" dominant-baseline="middle"
                :y="nodeHeight / 2" :x="nodeWidth / 2">{{node.data.name}}</text>
        </g>`,
    props: {
        node: {
            type: Object
        },
        nodeWidth: {
            type: Number
        },
        nodeHeight: {
            type: Number
        },
        nodeFill: {
            type: String
        },
        nodeTextColor: {
            type: String
        }
    },
    computed: {
        rootTransform() {
            return `translate(${this.node.x}, ${this.node.y})`
        }
    }
});