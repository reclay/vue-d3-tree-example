Vue.component('Tree', {
    template: `<div :style="containerSize" class="tree-container">
        <svg :width="size.width" :height="size.height">
            <g>
                <link-line v-for="link in links" :link="link" :key="link.target.id"
                    :node-width="nodeWidth" :node-height="nodeHeight"
                    :link-stroke="linkStroke" :link-stroke-width="linkStrokeWidth"></link-line>
            </g>
            <g>
                <link-node v-for="node in nodes" :node="node" :key="node.id"
                    :node-width="nodeWidth" :node-height="nodeHeight" :node-fill="nodeFill"
                    :node-text-color="nodeTextColor"></link-node>
            </g>
        </svg>
    </div>`,
    props: {
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        },
        treeData: {
            type: Object
        },
        flattenData: {
            type: Array
        },
        isFlatten: {
            type: Boolean
        },
        horizontal: {
            type: Boolean
        },
        separation: {
            type: Function,
            default: () => 1
        },
        nodeWidth: {
            type: Number,
            default: 140
        },
        nodeHeight: {
            type: Number,
            default: 36
        },
        nodeGapH: {
            type: Number,
            default: 100 + 140
        },
        nodeGapV: {
            type: Number,
            default: 80 + 36
        },
        nodeFill: {
            type: String,
            default: '#5ec264'
        },
        nodeTextColor: {
            type: String,
            default: '#fff'
        },
        linkStroke: {
            type: String,
            default: '#e1e9f0'
        },
        linkStrokeWidth: {
            type: [String, Number],
            default: 2
        }
    },
    data() {
        return {
            size: {
                width: 0,
                height: 0
            },
            nodes: [],
            links: [],
            drawTree: () => {}
        };
    },
    computed: {
        containerSize() {
            let width = this.width || this.size.width + 20;
            let height = this.height || this.size.height + 20;
            return {
                width: this.formatPx(width),
                height: this.formatPx(height)
            };
        }
    },
    methods: {
        formatPx(d) {
            return (d + '').replace(/[px]/gi, '') + 'px';
        },
        swapXY(node) {
            let tmp = node.x;
            node.x = node.y;
            node.y = tmp;
        },
        scaleX(nodes) {
            let arr = nodes.map(node => node.x);
            arr = _.uniq(arr);
            let min = d3.min(arr);
            let max = d3.max(arr);
            let width = this.nodeGapH * (arr.length);
            let scaleLinear = d3.scaleLinear().domain([min, max]).range([0, width]);
            return {
                width: width + this.nodeWidth,
                scaleLinearX: scaleLinear
            };
        },
        scaleY(nodes) {
            let arr = nodes.map(node => node.y);
            arr = _.uniq(arr);
            let min = d3.min(arr);
            let max = d3.max(arr);
            let height = this.nodeGapV * (arr.length);
            let scaleLinear = d3.scaleLinear().domain([min, max]).range([0, height]);
            return {
                height: height + this.nodeHeight,
                scaleLinearY: scaleLinear
            };
        },
        innerDrawTree() {
            let hierarchyNode;
            if (this.isFlatten) {
                hierarchyNode = d3.stratify().id(d => d.name).parentId(d => d.parent)(this.flattenData);
            } else {
                hierarchyNode = d3.hierarchy(this.treeData);
            }
            let tree = d3.tree().size([100, 100]).separation(this.separation);
            let treeData = tree(hierarchyNode);
            // 交换 x y 就是横的树
            if (this.horizontal) {
                treeData.each(this.swapXY);
            }
            let nodes = treeData.descendants();
            let links = treeData.links();
            let {
                width,
                scaleLinearX
            } = this.scaleX(nodes);
            let {
                height,
                scaleLinearY
            } = this.scaleY(nodes);
            treeData.each(node => {
                node.x = scaleLinearX(node.x);
                node.y = scaleLinearY(node.y);
            });
            this.nodes = nodes;
            this.links = links;
            this.size.width = width;
            this.size.height = height;
        }
    },
    watch: {
        flattenData() {
            this.drawTree();
        },
        treeData() {
            this.drawTree();
        },
        isFlatten() {
            this.drawTree();
        },
        horizontal() {
            this.drawTree();
        }
    },
    created() {
        this.drawTree = _.debounce(this.innerDrawTree, 100);
        this.drawTree();
    }
});