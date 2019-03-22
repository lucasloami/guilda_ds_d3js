chart_bar = function () {
  const chartContainer = d3.select(".chart1");
  var w, h, svg, bars, barPadding, barWidth, chartHeight, chartWidth, chartBox,
  margin;
  var init = function(height) {
    margin = {top: 20, right: 40, bottom: 30, left: 40};
    w = chartContainer.node().getBoundingClientRect().width;
    h = height;
    barPadding = 5;
    chartHeight = (h - margin.top - margin.bottom);
    chartWidth =(w - margin.left - margin.right); 
    svg = chartContainer
          .append("svg")
            .attr("viewBox", `0 0 ${w} ${h}`)
        ;
    chartBox = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("class", "chart-box")
  };
  var draw = function(data) {
    barWidth = (chartWidth/data.length);
    bars = chartBox.selectAll("rect")
          .data(data)
          .join("rect")
            .attr("y", (d) => {return(chartHeight-d)})
            .attr("height", (d) => {return(d)})
            .attr("width", barWidth - barPadding)
            .attr("transform", (d, i) => {
              return(`translate(${barWidth * i}, 0)`)
            })
            .attr("fill", "cornflowerblue")
      ;
  };
  return({init: init, draw: draw});
}();

chart_bar_var1 = function () {
  const chartContainer = d3.select(".chart2");
  var w, h, svg, bars, chartHeight, chartWidth, chartBox, margin, xScale;
  var init = function(height) {
    margin = {top: 20, right: 40, bottom: 30, left: 40};
    w = chartContainer.node().getBoundingClientRect().width;
    h = height;
    chartHeight = (h - margin.top - margin.bottom);
    chartWidth =(w - margin.left - margin.right); 
    svg = chartContainer
          .append("svg")
            .attr("viewBox", `0 0 ${w} ${h}`)
        ;
    chartBox = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("class", "chart-box")
  };
  var draw = function(data) {
    xScale = d3.scaleBand()
              .range([0, w - margin.left - margin.right])
              .padding(0.01)
              .domain(data.map((d) => {return(d)}))
            ;

    bars = chartBox.selectAll("rect")
          .data(data)
          .join("rect")
            .attr("y", (d) => {return(chartHeight-d)})
            .attr("x", (d) => {return(xScale(d))})
            .attr("height", (d) => {return(d)})
            .attr("width", xScale.bandwidth())
            .attr("fill", "cornflowerblue")
      ;

    // add the x Axis
    xAxis = chartBox.append("g")
              .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(xScale))
            ;
  };
  return({init: init, draw: draw});
}();

chart_bar_var2 = function () {
  const chartContainer = d3.select(".chart3");
  var w, h, svg, bars, chartHeight, chartWidth, chartBox, margin, xScale, yScale;
  var init = function(height) {
    margin = {top: 20, right: 40, bottom: 30, left: 40};
    w = chartContainer.node().getBoundingClientRect().width;
    h = height;
    chartHeight = (h - margin.top - margin.bottom);
    chartWidth =(w - margin.left - margin.right); 
    svg = chartContainer
          .append("svg")
            .attr("viewBox", `0 0 ${w} ${h}`)
        ;
    chartBox = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("class", "chart-box")
  };
  var draw = function(data) {
    xScale = d3.scaleBand()
              .range([0, w - margin.left - margin.right])
              .padding(0.01)
              .domain(data.map((d) => {return(d[0])}))
            ;

    yScale = d3.scaleLinear()
          .range([chartHeight, 0])
          .domain([0, d3.max(data, function(d) { return d[1]; })]);

        ;
    bars = chartBox.selectAll("rect")
              .data(data)
              .join("rect")
                .attr("y", (d) => {return(yScale(d[1]))})
                .attr("x", (d) => {return(xScale(d[0]))})
                .attr("height", (d) => {return(chartHeight - yScale(d[1]) )})
                .attr("width", xScale.bandwidth())
                .attr("fill", "cornflowerblue")
          ;

    // add the x Axis
    xAxis = chartBox.append("g")
              .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(xScale))
            ;

    // add the y Axis
    yAxis = chartBox.append("g")
        .call(d3.axisLeft(yScale))
        ;
  };
  return({init: init, draw: draw});
}();

chart_bar_var3 = function () {
  const chartContainer = d3.select(".chart4");
  var w, h, svg, bars, chartHeight, chartWidth, chartBox, margin, xScale, yScale;
  var init = function(height) {
    margin = {top: 20, right: 50, bottom: 40, left: 50};
    w = chartContainer.node().getBoundingClientRect().width;
    h = height;
    chartHeight = (h - margin.top - margin.bottom);
    chartWidth =(w - margin.left - margin.right); 
    svg = chartContainer
          .append("svg")
            .attr("viewBox", `0 0 ${w} ${h}`)
        ;
    chartBox = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("class", "chart-box")
  };
  var draw = function(data) {
    xScale = d3.scaleBand()
              .range([0, w - margin.left - margin.right])
              .padding(0.01)
              .domain(data.map((d) => {return(d[0])}))
            ;

    yScale = d3.scaleLinear()
          .range([chartHeight, 0])
          .domain([0, d3.max(data, function(d) { return d[1]; })]);

        ;
    bars = chartBox.selectAll("rect")
              .data(data)
              .join("rect")
                .attr("id", (d, i) => {return(`bar-${i}`)})
                .attr("y", (d) => {return(yScale(d[1]))})
                .attr("x", (d) => {return(xScale(d[0]))})
                .attr("height", (d) => {return(chartHeight - yScale(d[1]) )})
                .attr("width", xScale.bandwidth())
                .attr("fill", "cornflowerblue")
                .on("mouseover", (d, i) => {
                  d3.select(`#bar-${i}`).attr("fill", "pink")
                })
                .on("mouseout", (d, i) => {
                  d3.select(`#bar-${i}`).attr("fill", "cornflowerblue")
                })
          ;

    // add the x Axis
    xAxis = chartBox.append("g")
              .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(xScale))
            ;

    // add the y Axis
    yAxis = chartBox.append("g")
        .call(d3.axisLeft(yScale))
        ;

    xLabel = chartBox.append("text")
                        .attr("transform", `translate(${chartWidth/2}, ${chartHeight + margin.bottom})`)
                        .attr("text-anchor", "middle")
                        .text("Label X")
                    ;

    yLabel = chartBox.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left)
                        .attr("x", 0 - (chartHeight / 2))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("Label Y");   
  };
  return({init: init, draw: draw});
}();


chart_bar_var4 = function () {
  const chartContainer = d3.select(".chart5");
  var w, h, svg, bars, chartHeight, chartWidth, chartBox, margin, xScale, yScale,
  tooltip;
  var init = function(height) {
    margin = {top: 20, right: 50, bottom: 40, left: 50};
    w = chartContainer.node().getBoundingClientRect().width;
    h = height;
    chartHeight = (h - margin.top - margin.bottom);
    chartWidth =(w - margin.left - margin.right); 
    svg = chartContainer
          .append("svg")
            .attr("viewBox", `0 0 ${w} ${h}`)
        ;
    chartBox = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .attr("class", "chart-box")
                ;
    tooltip = chartContainer.append("div")
              .style("opacity", 0)
              .attr("class", "tooltip")
              .style("background-color", "black")
              .style("border-radius", "5px")
              .style("padding", "10px")
              .style("color", "white")
              .style("width", "70px")
              .style("position", "absolute")
            ;
  };
  showTooltip = (d) => {
    tooltip.transition().duration(100);
    tooltip
        .style("opacity", 1)
        .html(`Nome: ${d[0]}, Valor: ${d[1]}`)
        .style("left", `${d3.event.pageX+30}px`)
        .style("top", `${d3.event.pageY-20}px`)
      ;
  };

  hideTooltip = (d) => {
    tooltip.transition(200)
          .style("opacity", 0)
        ;
  };
  var draw = function(data) {
    xScale = d3.scaleBand()
              .range([0, w - margin.left - margin.right])
              .padding(0.01)
              .domain(data.map((d) => {return(d[0])}))
            ;

    yScale = d3.scaleLinear()
          .range([chartHeight, 0])
          .domain([0, d3.max(data, function(d) { return d[1]; })]);

        ;
    bars = chartBox.selectAll("rect")
              .data(data)
              .join("rect")
                .attr("id", (d, i) => {return(`barv4-${i}`)})
                .attr("y", (d) => {return(yScale(d[1]))})
                .attr("x", (d) => {return(xScale(d[0]))})
                .attr("height", (d) => {return(chartHeight - yScale(d[1]) )})
                .attr("width", xScale.bandwidth())
                .attr("fill", "cornflowerblue")
                .on("mouseover", (d, i) => {
                  d3.select(`#barv4-${i}`).attr("fill", "pink");
                  showTooltip(d);
                })
                .on("mouseout", (d, i) => {
                  d3.select(`#barv4-${i}`).attr("fill", "cornflowerblue");
                  hideTooltip(d);
                })
          ;

    // add the x Axis
    xAxis = chartBox.append("g")
              .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(xScale))
            ;

    // add the y Axis
    yAxis = chartBox.append("g")
        .call(d3.axisLeft(yScale))
        ;

    xLabel = chartBox.append("text")
                        .attr("transform", `translate(${chartWidth/2}, ${chartHeight + margin.bottom})`)
                        .attr("text-anchor", "middle")
                        .text("Label X")
                    ;

    yLabel = chartBox.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left)
                        .attr("x", 0 - (chartHeight / 2))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("Label Y");   
  };
  return({init: init, draw: draw});
}();


chart_bar.init(300);
chart_bar.draw([80, 100, 56, 120, 180, 30, 40, 120, 160]);

chart_bar_var1.init(300);
chart_bar_var1.draw([80, 100, 56, 120, 180, 30, 40, 120, 160]);

chart_bar_var2.init(300);
chart_bar_var2.draw([["A", 80], ["B", 100], ["C", 56], ["D", 120], ["E", 180], 
         ["F", 30], ["G", 40], ["H", 120], ["I", 160]]);

chart_bar_var3.init(300);
chart_bar_var3.draw([["A", 80], ["B", 100], ["C", 56], ["D", 120], ["E", 180], 
         ["F", 30], ["G", 40], ["H", 120], ["I", 160]]);

chart_bar_var4.init(300);
chart_bar_var4.draw([["A", 80], ["B", 100], ["C", 56], ["D", 120], ["E", 180], 
         ["F", 30], ["G", 40], ["H", 120], ["I", 160]]);