var allData = [];

var sunburst, cluster, senten;

loadData();

function loadData() {
    d3.csv("data/profiles_wrangled.csv", function(error, data) {
        if (error) {
            console.log("Error loading data: " + error);
        } else {

            data.forEach(function(d) {
                delete d[""];
                delete d["Unnamed: 0"];

                d.age = parseInt(d.age);
                d.asian = d.asian == "True";
                d.black = d.black == "True";
                d.endagebucket = parseInt(d.endagebucket);
                d.haspets = d.haspets == "True";
                d.height = parseInt(d.height);
                d.hispanic = d.hispanic == "True";
                d.indian = d.indian == "True";
                d.middle_eastern = d.middle_eastern == "True";
                d.native_american = d.native_american == "True";
                d.other = d.other == "True";
                d.pacific_islander = d.pacific_islander == "True";
                d.startagebucket = parseInt(d.startagebucket);
                d.white = d.white == "True";
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