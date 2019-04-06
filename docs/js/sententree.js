var sententree = function(data) {
    d3.select("#sententree").selectAll("*").remove();
    var model = new SentenTree.SentenTreeBuilder().buildModel(thisstory);
    new SentenTree.SentenTreeVis('#sententree').data(model.getRenderedGraphs(3))
        .on('nodeClick', function(node) {
            d3.select("#description").text("The top sentence for the word '" + node.data.entity + "' is: ");
            d3.select("#topsentence").text(node.data.topEntries[0].rawText);
        });
}
