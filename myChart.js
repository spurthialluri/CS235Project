//Author: Sri Spurthi Alluri
//April 8th 2018
function ganttAlikeChart() {
    width = 800;
    height = 650;
    margin = { top: 20, right: 100, bottom: 20, left: 100 };
    xScale = d3.scaleTime();
    yScale = d3.scaleLinear();
    colorScale = d3.scaleLinear();
    xValue = d => d.Book;
    yValue = d => d.Position;
    colorValue = d => d.Colors;
    barHeight = 30;
    barWidth = 100;

    dateFormat= d3.format("s");
    function chart(selection) {
        selection.each(function (data) {
            var svg = d3.select(this).selectAll("svg").data([data]).enter().append("svg");
            svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
            var gEnter = svg.append("g");
            var mainGroup = svg.select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            xScale = xScale
                            .domain(d3.extent(data, d => dateFormat(xValue(d))))
                            .range([0, width]);

            yScale = yScale
                           .domain(d3.extent(data, d => dateFormat(yValue(d))))
                           .range([0, height]);
            console.log("xScale  yScale", xScale, yScale);
            let dataByDates = d3.nest().key(d => xValue(d)).entries(data);
            let tickValues = dataByDates.map(d => dateFormat(d.key));

            let dataByCategories = d3.nest().key(d => colorValue(d)).entries(data);
            let categories = dataByCategories.map(d => d.key).sort();

            colorScale = colorScale
                         .domain([0, 94])
                         .range(["#FF0000", "#0000FF"])
                         .interpolate(d3.interpolateHcl);

            var xAxis = d3.axisBottom()
                        .scale(xScale)
                        .tickValues(tickValues)
                        .tickSize(height, 0, 0)
                        .tickSizeOuter(0);

            var grid = mainGroup.append('g').attr("class", "grid").call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "middle")
                    .attr("fill", "#000")
                    .attr("stroke", "none")
                    .attr("font-size", 12)
                    .attr("dy", "1em");

            var BookLabels = mainGroup.append('g')
                    .selectAll("text")
                    .data(dataByDates)
                    .enter()
                    .append("text")
                    .attr("x", d => xScale(dateFormat(d.values[0].Book)))
                    .attr("y", -3)
                    .text(d => d.values[0].Name)
                    .attr("font-size", 14)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black");

            yScale = yScale.domain([0, 650]).range([0, height]);

            var spells = mainGroup
                           .append('g')
                           .selectAll("this_is_empty")
                           .data(data)
                           .enter();
            // creating circles
            var circle = spells.append("circle")
                            .attr("cx", (d, i) => xScale(dateFormat(xValue(d))))
                            .attr("cy", (d, i) => yScale(dateFormat(yValue(d))))
                            .attr("r", 10)
                            .attr("stroke", "none")
                            .attr("fill", d => d3.rgb(colorValue(d)));
            console.log("Circle  ", circle.cx, circle.cy);

            var tooltip = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);

            circle.on("mouseover", e => {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(e.Spell + "</br>" + e.Effect + "</br>")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
            }).on("mouseout", e => {
                tooltip.transition().duration(500).style("opacity", 0);
            });

            circle.on("click", e => {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(e.Spell + "</br>" + "occurance in "+e.Name+": ..." + e.Concordance+"...")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
            });
        })
    }
    chart.width = function (value) { if (!arguments.length) { return width; } width = value; return chart; }
    chart.height = function (value) { if (!arguments.length) { return height; } height = value; return chart; }
    chart.margin = function (value) { if (!arguments.length) { return margin; } margin = value; return chart; }
    chart.xScale = function (value) { if (!arguments.length) { return xScale; } xScale = value; return chart; }
    chart.yScale = function (value) { if (!arguments.length) { return yScale; } yScale = value; return chart; }
    chart.colorScale = function (value) { if (!arguments.length) { return colorScale; } colorScale = value; return chart; }
    chart.xValue = function (value) { if (!arguments.length) { return xValue; } xValue = value; return chart; }
    chart.yValue = function (value) { if (!arguments.length) { return yValue; } yValue = value; return chart; }
    chart.colorValue = function (value) { if (!arguments.length) { return colorValue; } colorValue = value; return chart; }
    chart.barHeight = function (value) { if (!arguments.length) { return barHeight; } barHeight = value; return chart; }
    chart.barWidth = function (value) { if (!arguments.length) { return barWidth; } barWidth = value; return chart; }
    chart.dateFormat = function (value) { if (!arguments.length) { return dateFormat; } dateFormat = value; return chart; }
    return chart;
}