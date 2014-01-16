(function(){

  var telltale = window.telltale || (window.telltale = {});

  telltale.timeline = function(){

    var width = 900,
      height = 100,
      dispatch = d3.dispatch("brushed"),
      start,
      end,
      startBrush,
      endBrush;


    function timeline(selection){
      selection.each(function(data){

        var max = d3.max(data[0].values, function(d){return d.values.count}) //to fix!
         var margin = {top: 20, right: 50, bottom: 20, left: 50},
          w = width - margin.right - margin.left,
          h = height - margin.top - margin.bottom

        selection = selection.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var format = d3.time.format("%Y-%m-%d");
         
        var x = d3.time.scale()
            .range([0, w]);

        x.domain([start, end]);

        var y = d3.scale.linear()
            .domain([0,max])
            .range([h, 0]);

        //var color = function(d){ return colors[d]; };//d3.scale.ordinal().range(['#6CC5F0','#F0965B']) //d3.scale.category10(); 

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(format.parse(d.date)); })
            .y(function(d) { return y(d.values.count); });

        var area = d3.svg.area()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y0(h)
            .y1(function(d) { return y(d.values.count); });

        //color.domain(d3.keys(data[0]).filter(function(key) { return activities.indexOf(key) != -1; }));

        //if (!scales) scales = {};

        //var lines = activities.map(linesAccessor);

        

       /*y.domain([
          d3.min(lines, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
          d3.max(lines, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
        ]);*/


        /* Areas */

        var social = selection.selectAll(".timeSocial")
          .data(data) //the data

        social.enter().append("g")
          .attr("class", function(d){return "timeSocial " + d.source});

        social.exit().remove();

        var path = social.selectAll("path")
          .data(function(d){ return [d];})

        path
          .style("stroke", function(d) { return "red" })
          .transition()
            .attr("d", function(d) { return line(d.values); })

        // path.enter().append("path")
        //   .attr("class", "area")
        //   .style("stroke", function(d) { return color(d.name); })
        //   .transition()
        //     .attr("d", function(d) { return line(d.values); })

        path.enter().append("path")
          .attr("class", "line")
          .style("stroke", function(d) { return "red" })
            .transition()
            .attr("d", function(d) { return line(d.values); })

        path.exit().remove();

        /* Axis */

        selection.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .ticks(d3.time.days)
              .tickPadding(0))
          .selectAll("text")
            .attr("x", 6)
            .style("text-anchor", null);

        //var startExtent = d3.max([startBrush, data[0].date]),
        //    endExtent = d3.min([endBrush,data[data.length-1].date]);



        /* Brush */
      
        var brush = d3.svg.brush()
          .x(x)
          //.extent([startBrush, endBrush])
          .on("brush", function(d){
            //mask.reveal(brush.extent());
          })
          .on("brushend", brushended);

        function brushended() {
          if (!d3.event.sourceEvent) return; // only transition after input
          var extent0 = brush.extent(),
              extent1 = extent0.map(d3.time.day.round);

          // if empty when rounded, use floor & ceil instead
          /*if (extent1[0] >= extent1[1]) {
            extent1[0] = d3.time.day.floor(extent0[0]);
            extent1[1] = d3.time.day.ceil(extent0[1]);
          }
          */
          d3.select(this).transition()
              .call(brush.extent(extent1))
              .call(brush.event);
          if (brush.empty())  dispatch.brushed([start, end])
          else dispatch.brushed(brush.extent()); 
        }
        //selection.selectAll("g.brush").remove();
        
        var gBrush = selection.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.event);

        gBrush.selectAll("rect")
            .attr("height", h);


      });
    }


    timeline.width = function(x){
      if (!arguments.length) return width;
      width = x;
      return timeline;
    }

    timeline.height = function(x){
      if (!arguments.length) return height;
      height = x;
      return timeline;
    }

    timeline.start = function(x){
      if (!arguments.length) return start;
      start = x;
      return timeline;
    }

    timeline.end = function(x){
      if (!arguments.length) return end;
      end = x;
      return timeline;
    }
    timeline.startBrush = function(x){
      if (!arguments.length) return startBrush;
      startBrush = x;
      return timeline;
    }

    timeline.endBrush = function(x){
      if (!arguments.length) return endBrush;
      endBrush = x;
      return timeline;
    }

    d3.rebind(timeline, dispatch, 'on');
    return timeline;
  }
  
})();