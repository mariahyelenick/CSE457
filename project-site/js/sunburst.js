SunburstDisplay = function(_data) {
    this.data = _data;
    this.init();

}

SunburstDisplay.prototype.init = function() {
    var vis = this;
    vis.tip = d3.tip().attr("class", "d3-tip").html(function(d) {
        return d;
    });

    var div = d3.select("#sunburst");

    vis.svgWidth = div.node().getBoundingClientRect().width;
    vis.svgHeight = 600;    
    vis.svg = div.append("svg").attr("height", vis.svgHeight).attr("width", vis.svgWidth).attr("id", "sunburst_svg");
    vis.radius = Math.min(vis.svgHeight, vis.svgWidth) /2;

    vis.wrangledData = vis.wrangle();
    var vLayout = d3.partition().size([2 * Math.PI, Math.min(vis.svgWidth, vis.svgHeight) / 2]);

    var vRoot = d3.hierarchy(vis.wrangledData).sum(function (d) { 
        return d.size;
    });
    var vNodes = vRoot.descendants();
    vLayout(vRoot);
    var vArc = d3.arc()
        .startAngle(function (d) { return d.x0; })
        .endAngle(function (d) { return d.x1; })
        .innerRadius(function (d) { return d.y0; })
        .outerRadius(function (d) { return d.y1; });

    var g = vis.svg.append("g");
    var color = d3.scaleOrdinal(d3.schemeCategory20b);
    g.selectAll('path')
        .data(vNodes)
        .enter()
        .append('path')
        .attr("d", vArc)
        .attr("transform", "translate(" + vis.svgWidth/2 + ", 300)")
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .on("mouseover", vis.tip.show)
        .on("mouseout", vis.tip.hide);
    vis.svg.call(vis.tip);


}

SunburstDisplay.prototype.wrangle = function() {
    var vis = this;
    var categories = ["zodiac", "sex", "startagebucket"];
    var catsWithOptions = [];
    
    var catsWithOptions = [];

    for (var i=0; i < categories.length; i++) {
        var obj = {};
        obj.catName = categories[i];
        obj.optionNames = [];
        catsWithOptions.push(obj);
    }

    vis.data.forEach(function(d) {
        for (var i=0; i < catsWithOptions.length; i++) {
            if (!catsWithOptions[i].optionNames.includes(d[catsWithOptions[i].catName])) { // option exists in array already
                catsWithOptions[i].optionNames.push(d[catsWithOptions[i].catName]);
            }
        }
    });
    // console.log(catsWithOptions);

    var nodeData = makeInnerData(catsWithOptions, 0, "Filtered Profiles", vis.data);
    
   
    console.log(nodeData);
    return nodeData;

}

// Do we actually use this?
// function findIndexByAttr(array, attr, value) {
//     for(var i = 0; i < array.length; i += 1) {
//         if(array[i][attr] == value) {
//             return i;
//         }
//     }
//     return -1;
// }

function breakSetIntoOptions(cat, dataSet) {

    var splitUp = {};
    cat.optionNames.forEach(function(c) {
        splitUp[c] = [];
    });

    dataSet.forEach(function(d) {
        splitUp[d[cat.catName]].push(d);
    });

    return splitUp;
}

function makeLeafData(optionName, dataSet) {
    var obj = {};
    obj.name = optionName;
    obj.size = dataSet.length;
    return obj;
}

function makeInnerData(catsWithOptions, index, optionName, dataSet) {
    var obj = {};
    obj.name = optionName;
    obj.sets = breakSetIntoOptions(catsWithOptions[index], dataSet);

    if (index < catsWithOptions.length-1) {
        obj.children = [];
        catsWithOptions[index].optionNames.forEach(function(d) {
            obj.children.push(makeInnerData(catsWithOptions, index+1, d, obj.sets[d]));
        });
    } else {
        obj.children = [];
        catsWithOptions[index].optionNames.forEach(function(d) {
            obj.children.push(makeLeafData(d, obj.sets[d]));
        });
    }

    return obj;
}