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
    var colorInner = d3.scaleOrdinal(d3.schemeSet3);
    var colorMiddle = d3.scaleOrdinal(d3.schemePaired);
    var colorOuter = d3.scaleOrdinal(d3.schemeSet3);

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
            vis.viewSententree(d.data.profiles);
            vis.viewRandProf(d.data.profiles);
        });
    vis.svg.call(vis.tip);
}

SunburstDisplay.prototype.viewRandProf = function(datasets) {
    d3.select("#profiles").selectAll("*").remove();
    var randNum = Math.floor((Math.random()*datasets.length));
    var randProf = datasets[randNum];
    console.log(randProf);
    d3.select("#profiles")
        .append("text")
        .text("Age:" + randProf.age);
}

SunburstDisplay.prototype.viewSententree = function(datasets) {
    sententreeprep = [];
    var id = 0;
    datasets.forEach(element => {
        if(element["couldnt_live_without"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["couldnt_live_without"]
            sententreeprep.push(obj);
        }
        if(element["doing_with_my_life"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["doing_with_my_life  "]
            sententreeprep.push(obj);
        }
        if(element["favorite_stuff"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["favorite_stuff"]
            sententreeprep.push(obj);
        }
        if(element["first_noticeable_thing"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["first_noticeable_thing"]
            sententreeprep.push(obj);
        }
        if(element["really_good_at"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["really_good_at"]
            sententreeprep.push(obj);
        }
        if(element["typical_Friday"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["typical_Friday"]
            sententreeprep.push(obj);
        }
        if(element["self_summary"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["self_summary"]
            sententreeprep.push(obj);
        }
        if(element["thinking_about"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["thinking_about"]
            sententreeprep.push(obj);
        }
        if(element["secrets"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["secrets"]
            sententreeprep.push(obj);
        }
        if(element["message_if"]) {
            var obj = {};
            obj.id = id;
            id++;
            obj.count = 1;
            obj.text = element["message_if"]
            sententreeprep.push(obj);
        }
    });
    sententree(sententreeprep);
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
    obj.profiles = dataSet;
    return obj;
}

function makeInnerData(catsWithOptions, index, optionName, dataSet) {
    var obj = {};
    obj.name = optionName;
    obj.sets = breakSetIntoOptions(catsWithOptions[index], dataSet);
    obj.profiles = dataSet;

    if (index < catsWithOptions.length-1) {
        obj.children = [];
        catsWithOptions[index].optionNames.forEach(function(d) {
            if ((d != null && d != "") || (d == false || d == true)) {
                obj.children.push(makeInnerData(catsWithOptions, index+1, d, obj.sets[d]));
            }
            
        });
    } else {
        obj.children = [];
        catsWithOptions[index].optionNames.forEach(function(d) {
            if ((d != null && d != "") || (d == false || d == true)) {
                obj.children.push(makeLeafData(d, obj.sets[d]));
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