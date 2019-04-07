SunburstDisplay = function(_data) {
    this.data = _data;
    this.init();

}

SunburstDisplay.prototype.init = function() {
    var vis = this;
    vis.tip = d3.tip().attr("class", "d3-tip").html(function(d) {
        return d.data.name;
    });

    var div = d3.select("#sunburst");
    div.selectAll("*").remove();

    vis.svgWidth = div.node().getBoundingClientRect().width;
    vis.svgHeight = 600;    
    vis.svg = div.append("svg").attr("height", vis.svgHeight).attr("width", vis.svgWidth).attr("id", "sunburst_svg");
    vis.radius = Math.min(vis.svgHeight, vis.svgWidth) /2;

    vis.update();
}

SunburstDisplay.prototype.wrangle = function() {
    var vis = this;
    var categories = getCategories();
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

    var nodeData = makeInnerData(catsWithOptions, 0, "Filtered Profiles", vis.data);
    
    return nodeData;

}

SunburstDisplay.prototype.update = function() {
    var vis = this;
    vis.svg.select("g").remove();
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
    var colorInner = d3.scaleOrdinal(d3.schemeCategory20);
    var colorMiddle = d3.scaleOrdinal(d3.schemeCategory20b);
    var colorOuter = d3.scaleOrdinal(d3.schemeCategory20c);

    g.selectAll('path')
        .data(vNodes)
        .enter()
        .append('path')
        .attr("d", vArc)
        .attr("transform", "translate(" + vis.svgWidth/2 + ", 300)")
        .style("fill", function (d) { 
            if (d.depth == 0) {
                return "none";
            }
            // if (d.depth == 0 || (d.depth == 1 && d.data.name == "") || (d.depth == 2 && d.parent.data.name == "") || (d.depth == 3 && d.parent.parent.data.name == "")) {
            //     return "none";
            // } else 
            else if (d.depth == 1) {
                return colorInner(d.data.name);
            }
            else if (d.depth == 2) {
                return colorMiddle(d.data.name);
            }
            else {
                return colorOuter(d.data.name);
            }
        })
        .style("stroke", "white")
        .style("stroke-width", .5)
        .attr("class", function(d) {
            if (d.data.size == 0) {
                return "empty wedge";
            }
            return "wedge";
        })
        .on("mouseover", vis.tip.show)
        .on("mouseout", vis.tip.hide)
        .on("click", function(d) {
            vis.viewSententree(d.data.sets, d.data.children);
        });
    vis.svg.call(vis.tip);
}

SunburstDisplay.prototype.viewSententree = function(data, chillens) {
    // console.log(data);
    chillens.forEach(function(d) {
        // console.log(d.name);
    });
}

function breakSetIntoOptions(cat, dataSet) {
    // console.log(cat)
    var splitUp = {};
    cat.optionNames.forEach(function(c) {

        splitUp[c] = [];

    });

    dataSet.forEach(function(d) {
        // if (d[cat.catName] != "") {
            // console.log(d[cat.catName]);
            splitUp[d[cat.catName]].push(d);
        // }
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
            if ((d != null && d != "") || (d == false || d == true)) {
                obj.children.push(makeInnerData(catsWithOptions, index+1, d, obj.sets[d]));
            } else {
                console.log(d);
            }
            
        });
    } else {
        obj.children = [];
        catsWithOptions[index].optionNames.forEach(function(d) {
            if ((d != null && d != "") || (d == false || d == true)) {
                obj.children.push(makeLeafData(d, obj.sets[d]));
            } else {
                console.log(d);
            }
            
        });
    }

    return obj;
}

function getCategories() {
    var dropDown = document.getElementById("numCat");
    var num = dropDown.options[dropDown.selectedIndex].value;
    // console.log(num);

    var array = $("#sortable").sortable('toArray');
    d3.selectAll("#sortable li").classed("top3", false).classed("first", false).classed("second", false).classed("third", false);
    

    var newarray = [];
    newarray.push(array[0]);
    d3.select("#" + array[0]).classed("top3", true).classed("first", true);
    if (num == "two" || num == "three") {
        newarray.push(array[1]);
        d3.select("#" + array[1]).classed("top3", true).classed("second", true);
    }
    if (num == "three") {
        newarray.push(array[2]);
        d3.select("#" + array[2]).classed("top3", true).classed("third", true);
    }
    //console.log(newarray);

    
    
    
    
    return newarray;
}