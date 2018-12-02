Vue.component('link-line', {
    template: `<g>
            <path :d="getLinkPath(link)" :stroke="linkStroke" fill="none" :stroke-width="linkStrokeWidth"></path>
        </g>`,
    props: {
        link: {
            type: Object
        },
        nodeWidth: {
            type: Number
        },
        nodeHeight: {
            type: Number
        },
        linkStroke: {
            type: String
        },
        linkStrokeWidth: {
            type: [String, Number]
        }
    },
    data() {
        return {
            genLink: d3.linkHorizontal().x(d => d.x).y(d => d.y)
        };
    },
    methods: {
        getCenterXY(node) {
            return {
                x: node.x + this.nodeWidth / 2,
                y: node.y + this.nodeHeight / 2
            };
        },
        getLinkPath(link) {
            let source = this.getCenterXY(link.source);
            let target = this.getCenterXY(link.target);
            return this.genLink({
                source,
                target
            });
        }
    }
});