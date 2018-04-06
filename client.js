var dataValues = [4, 8, 15, 16, 23, 110, 60, 70];
var dataCategories = ["Bikes", "Clothing", "Accessoires", "Tools", "Food", "Other", "Drinks", "Kits"];
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            "use strict";
            function renderBarChart() {
                var visualConstructorOptions = {
                    element: document.getElementById("container")
                };
                var theBarChart = new visual.barChart(visualConstructorOptions);
                var options = {
                    viewport: {
                        height: 400,
                        width: 400
                    },
                    dataViews: [{
                            categorical: {
                                values: dataValues,
                                categories: dataCategories
                            }
                        }
                    ]
                };
                theBarChart.update(options);
            }
            visual.renderBarChart = renderBarChart;
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=client.js.map