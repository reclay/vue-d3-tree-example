new Vue({
    el: '#app',
    data() {
        return {
            treeData,
            flattenData,
            isFlatten: false,
            horizontal: true
        };
    },
    template: `<Tree :tree-data="treeData" :flatten-data="flattenData" :is-flatten="isFlatten"
        :horizontal="horizontal" />`
});
