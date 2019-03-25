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

            });
            console.log(data);
            allData = data;

            createVis();

        }
    });
}

function createVis() {

    sunburst = new SunburstDisplay(allData);

}