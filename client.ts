let dataValues: number[] = [4, 8, 15, 16, 23, 110,60,70];
let dataCategories:string[] =
	["Bikes","Clothing","Accessoires","Tools","Food","Other","Drinks","Kits"];

module powerbi.extensibility.visual {
    "use strict";
    
    export function renderBarChart() : void {
        let visualConstructorOptions: VisualConstructorOptions = {
            element: document.getElementById("container")
        };

        let theBarChart: barChart = new barChart(visualConstructorOptions);

        let options: VisualUpdateOptions = {
            viewport: {
                height:400,
                width: 400
            },
            dataViews: [ { 
                categorical: {
                    values: dataValues,
                    categories: dataCategories
                }
              }
            ]
        };

        theBarChart.update(options);
    }
}
