var allData = [];
var dataCats = {};

var sunburst, cluster, senten;

loadData();

function loadData() {
    // d3.json("data/profiles_wrangled.json", function(data) {
    //     console.log(data);
    //     allData = data;
    //     createVis();
    // })
    d3.csv("data/profiles_wrangled.csv", function(error, data) {
        if (error) {
            console.log("Error loading data: " + error);
        } else {
            var i = 0;
            data.forEach(function(d) {
                delete d[""];
                delete d["Unnamed: 0"];

                d.age = parseInt(d.age);
                d.asian = d.asian == "TRUE";
                d.black = d.black == "TRUE";
                d.endagebucket10 = parseInt(d.endagebucket10);
                d.haspets = d.haspets == "TRUE";
                d.height = parseInt(d.height);
                d.hispanic = d.hispanic == "TRUE";
                d.indian = d.indian == "TRUE";
                d.middle_eastern = d.middle_eastern == "TRUE";
                d.native_american = d.native_american == "TRUE";
                d.other = d.other == "TRUE";
                d.pacific_islander = d.pacific_islander == "TRUE";
                d.startagebucket10 = parseInt(d.startagebucket10);
                d.white = d.white == "TRUE";
                d.ethnicityArr = parseEthnicities(d);
                d.ethnicityGroup = ethnicityGrouper(d);
                // var loc = d.location.split(", ");
                // d.city = loc[0];
                // d.state = loc[1];
                // if (loc.length == 3) {
                //     d.country = loc[2];
                // } else {
                //     d.country = "usa";
                // }
                // console.log(d.city + " " + d.state + " " + d.country);

                
                // if (i < 1000) {
                // for (var key in d) {
                    
                //     //console.log(d[key]);
                //     if (dataCats[key] == null) {
                //         dataCats[key] = [];
                //     }
                //     if (!dataCats[key].includes(d[key])) {
                //         dataCats[key].push(d[key]);
                //     }

                // }
                //    i = i + 1;
                // }
                
                

            });
            console.log(data);
            allData = data;

            createVis();

        }
    });
}

function parseEthnicities(d) {
    // console.log(d);
    var arr = [];
    if (d.white) { arr.push("white"); }
    if (d.black) { arr.push("black"); }
    if (d.middle_eastern) { arr.push("middle eastern"); }
    if (d.native_american) { arr.push("native american"); }
    if (d.pacific_islander) { arr.push("pacific islander"); }
    if (d.indian) { arr.push("indian"); }
    if (d.hispanic) { arr.push("hispanic"); }
    if (d.asian) { arr.push("asian"); }
    //console.log(arr);
    return arr;
}

function ethnicityGrouper(d) {
    if (d.ethnicityArr.length > 1) {
        return"multi-racial";
    } else if (d.ethnicityArr.length == 1) {
        // console.log(d.ethnicityArr[0]);
        return d.ethnicityArr[0];
    } else {
        return "";
    }
}

function createVis() {

    sunburst = new SunburstDisplay(allData);

}