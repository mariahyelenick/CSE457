
SunburstDisplay = function(_data) {
    this.data = _data;
    this.init();

}

SunburstDisplay.prototype.init = function() {
    var vis = this;

    var div = d3.select("#sunburst");

    vis.svgWidth = div.node().getBoundingClientRect().width;
    vis.svgHeight = 600;    
    vis.svg = div.append("svg").attr("height", vis.svgHeight).attr("width", vis.svgWidth).attr("id", "sunburst_svg");
    vis.radius = Math.min(vis.svgHeight, vis.svgWidth) /2;

    vis.wrangle();


}

SunburstDisplay.prototype.wrangle = function() {
    var vis = this;
    vis.layers = [];
    // vis.layers.push("sex");
    // vis.layers.push("actual_religion");

    var cat1 = {}; // "sex"
    cat1.name = "sex";
    var cat2 = {}; // "religion"
    cat2.name = "actual_religion";
    cat1.cats = [];
    cat2.cats = [];

    vis.data.forEach(function(d) {
        //console.log(d[cat1.name]);
        var i = findCatName(cat1.cats, d[cat1.name]);
        if (i == -1) {
            cat1.cats.push({catName: d[cat1.name], catCount: 1});
        } else {
            cat1.cats[i].catCount++;
        }
        // if (!cat2.cats.includes(d[cat2.name])) {
        //     cat2.cats.push(d[cat2.name]);
        // }else {
        //     var i = findCatName(cat2.cats, d[cat2.name]);
        //     cat2.cats[i].catCount++;
        // }
    });
    console.log(cat1);
    vis.layers.push(cat1);
    vis.layers.push(cat2);

    // var nodeData = {
    //     "name": vis.layers[0].name, "children": [{
    //         "name": vis.layers[0].cats[0],
    //         "children": [
    //             {"name": vis.layers[1].cats[0], "size": 4}, 
    //             {"name": "Sub A2", "size": 4}
    //         ]
    //     }, {
    //         "name": "Topic B",
    //         "children": [{"name": "Sub B1", "size": 3}, {"name": "Sub B2", "size": 3}, {
    //             "name": "Sub B3", "size": 3}]
    //     }, {
    //         "name": "Topic C",
    //         "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
    //     }]
    // };
    
}

function findCatName(array, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i].catName == value) {
            return i;
        }
    }
    return -1;
}