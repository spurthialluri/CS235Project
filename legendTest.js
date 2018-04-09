//Author: Sri Spurthi Alluri
//April 8th 2018
function createLegend() {
    width = 900;
    height = 650;
    margin = { top: 20, right: 200, bottom: 20, left: 100 };
    xScale = d3.scaleTime();
    yScale = d3.scaleLinear();
    colorScale = d3.scaleLinear();
    xValue = d => d.Column;
    yValue = d => d.Position;
    colorValue = d => d.Colors;
    spellName = d => d.Spell;
    barHeight = 30;
    barWidth = 100;

    dateFormat = d3.format("s");
    function legend(selection) {
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

            var xAxis = d3.axisBottom()
                        .scale(xScale)
                        .tickValues(tickValues)
                        .tickSize(height, 0, 0)
                        .tickSizeOuter(0);

            var grid1 = mainGroup.append('g').attr("class", "grid1").call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "middle")
                    .attr("fill", "#000")
                    .attr("stroke", "none")
                    .attr("font-size", 12)
                    .attr("dy", "1em");

      
            yScale = yScale.domain([0, 650]).range([0, height]);

            var spdata = mainGroup
                           .append('g')
                           .selectAll("this_is_empty")
                           .data(data)
                           .enter();



            // creating circles
            var circle = spdata.append("circle")
                            .attr("cx", (d, i) => xScale(dateFormat(xValue(d))))
                            .attr("cy", (d, i) => yScale(dateFormat(yValue(d))))
                            .attr("r", 10)
                            .attr("stroke", "none")
                            .attr("fill", d => d3.rgb(colorValue(d)));
            console.log("Circle  ", circle.cx, circle.cy);

            spdata.append("text")
        .attr("dx", d => xScale(dateFormat(xValue(d))))
        .attr("dy", d => yScale(dateFormat(yValue(d))))
        .text(function (d) { return spellName(d) })

         
        })
    }
    legend.width = function (value) { if (!arguments.length) { return width; } width = value; return legend; }
    legend.height = function (value) { if (!arguments.length) { return height; } height = value; return legend; }
    legend.margin = function (value) { if (!arguments.length) { return margin; } margin = value; return legend; }
    legend.xScale = function (value) { if (!arguments.length) { return xScale; } xScale = value; return legend; }
    legend.yScale = function (value) { if (!arguments.length) { return yScale; } yScale = value; return legend; }
    legend.colorScale = function (value) { if (!arguments.length) { return colorScale; } colorScale = value; return legend; }
    //legend.xValue = function (value) { if (!arguments.length) { return xValue; } xValue = value; return legend; }
    legend.yValue = function (value) { if (!arguments.length) { return yValue; } yValue = value; return legend; }
    legend.colorValue = function (value) { if (!arguments.length) { return colorValue; } colorValue = value; return legend; }
    legend.barHeight = function (value) { if (!arguments.length) { return barHeight; } barHeight = value; return legend; }
    legend.barWidth = function (value) { if (!arguments.length) { return barWidth; } barWidth = value; return legend; }
    legend.dateFormat = function (value) { if (!arguments.length) { return dateFormat; } dateFormat = value; return legend; }
    legend.spellName = function (value) { if (!arguments.length) { return spellName; } spellName = value; return legend; }
    //legend.colorValue = function (value) { if (!arguments.length) { return colorValue; } colorValue = value; return legend; }
    return legend;
}