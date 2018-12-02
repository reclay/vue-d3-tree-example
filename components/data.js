// 数据是嵌套好的使用 d3.hierarchy
var treeData = {
    name: '中国',
    children: [{
        name: '北京',
        children: [{
            name: '海淀'
        }, {
            name: '朝阳'
        }]
    }, {
        name: '上海'
    }]
};
// 数据是扁平的使用 d3.stratify
var flattenData = [{
    name: '中国',
    parent: ''
}, {
    name: '北京',
    parent: '中国'
}, {
    name: '上海',
    parent: '中国'
}, {
    name: '海淀',
    parent: '北京'
}, {
    name: '朝阳',
    parent: '北京'
}]