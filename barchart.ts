module powerbi.extensibility.visual {
    "use strict";

    export class barChart implements IVisual {

        private svg: d3.Selection<SVGElement>;
        private barGroup: d3.Selection<SVGElement>;
        private labelGroup: d3.Selection<SVGElement>;


        constructor (options:VisualConstructorOptions) {      

            let container = d3.select(options.element);

            this.svg = container.append("svg").classed("chart",true);

            this.barGroup = this.svg.append("g")
                .style("fill","rgb(75, 140, 20)");

            this.labelGroup = this.svg.append("g")
                .style("fill","rgb(255, 255, 255)")
                .style("font-size","10px");

        }
    
        update(options: VisualUpdateOptions) : void {
            let values = options.dataViews[0].categorical.values;
            let categories = options.dataViews[0].categorical.categories;

            let width = options.viewport.width;
            let height = options.viewport.height;

            this.svg
                .attr("width", width)
                .attr("height", height);

            let barHeight = height / categories.length;

            let xScale = d3.scale.linear()
                .domain([0,d3.max(values)])
                .range([0,width]);

            console.log(xScale(100));

            //Get any existing bar groups
            //and bind them to the data
            let barGroups = this.barGroup
                .selectAll("g")
                .data(values);

            //create any new bar groups if necessary
            barGroups
            .enter()
            .append("g")
            .classed("bar",true)
                .append("rect");


            //remove all bar groups that are not needed anymore
            //Like if you drag a new category field in that has fewer distinct values that //the previous one.
            barGroups
                .exit()
                .remove();

            barGroups
                .attr("transform", function(d,i) { return "translate(0," + i * barHeight + ")" } );
            
            let bars = barGroups.selectAll("rect")
                .attr("width",function(d) { return xScale(d); })
                .attr("height", barHeight-2)
                .attr("fill-opacity","1");

            //Bind any existing label groups
            let labelGroups = this.labelGroup
                .selectAll("g")
                .data(values);

            //create any new label groups if necessary
            labelGroups
                .enter()
                .append("g")
                .classed("label",true)
                    .append("text");
                    
            //Remove all label groups that are not needed anymore
            //If you drag a new category field in that has fewer distinct values 
            //then the previous one.
            labelGroups
                .exit()
                .remove();

            labelGroups
                .attr("transform", function(d,i) { return "translate(0," + i * barHeight + ")" } );

            let labels = labelGroups.select("text")
                .attr("x", function(d) { return xScale(d) - 3; })
                .attr("y", barHeight/2)
                .text( function(d) { return d;});

            bars.on("click",function(bar) {
                if(d3.select(this).classed("selected")) {
                    //if the current element is selected, remove the selection      
                    d3.select(this).classed("selected",false);
                    //set the fill opacity for all rects to 1.0
                    d3.selectAll("rect").style("fill-opacity","1.0");
            
                }
                else {
                    //remove any selected elements that there might be
                    d3.selectAll("rect").classed("selected",false);
                    d3.selectAll("rect").style("fill-opacity","0.4");
                    //and select the current element                  
                    d3.select(this).style("fill-opacity","1.0");
                    d3.select(this).classed("selected",true);
                }
                
            });
                
        }
    }

    
}
