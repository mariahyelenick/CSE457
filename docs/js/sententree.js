var sententree = function(data) {
    d3.select("#sententree").selectAll("*").remove();
    var model = new SentenTree.SentenTreeBuilder().buildModel(data);
    new SentenTree.SentenTreeVis('#sententree').data(model.getRenderedGraphs(1))
}
