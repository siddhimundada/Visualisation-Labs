function graph(map,a){
	document.getElementById("myRange").value="-15";

		 document.getElementById("myRange").disabled = true;

		d3.selectAll(".svg2").remove();

	var margin = {top: 20, right: 20, bottom: 100, left: 60},
		width=1000 - margin.left-margin.right,
		height=500-margin.top-margin.bottom,
		x     = d3.scaleBand().range([0,width]).padding(0.2);
		y     = d3.scaleLinear().range([height,0]);


	x.domain(map.map(function(d){return d.key;}))
	y.domain([0,d3.max(map,function(d){
					return d.value;
				})])

	var xAxis = d3.axisBottom()
		.scale(x)

	var yAxis = d3.axisLeft()
		.scale(y)
		.ticks(8);

	var svg = d3.select("#barGraph")
		.append("svg")
		.attr("width",width + margin.left + margin.right+130)
		.attr("height",height+margin.top + margin.bottom+130)
		.attr("class","svg2")
		.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")" );

	

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform","translate(0, " + height + ")")
				.attr("stroke-width", '2px')

		.call(xAxis)
		.selectAll("text")
		.style("font-size","1.5em")
		.style("text-anchor","end")
		.attr("dx","-0.5em")
		.attr("dy","-.55em")
		.attr("y", 30)
		.attr("transform","rotate(-45)");

	svg.append("g")
		.attr("class" , "y axis")
		.attr("stroke-width", '2px')

		.call(yAxis)
		.selectAll("text")
		.attr("font-size","1.5em")

		.attr("transform","rotate(0)")
		.attr("y",5)
		.attr("dy","0.8em")
		.attr("text-anchor","end");

	svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (margin.left/2-70) +","+(height/2)+")rotate(-90)")
          // text is drawn off the screen top left, move down and out and rotate
            .text("Frequency")
            .style("font-weight","bold")
            .style("font-size","1.5em");

     svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/4)+180)+")rotate(0)")
        .text(a)
        .style("font-weight","bold")
        .style("font-size","1.5em");	
	

	svg.selectAll("bar")
		.data(map)
		.enter()
		.append("rect")
		.attr("fill","#B03A2E")
		.attr("x",function(d){
			return x(d.key);
		})
		.attr("width",x.bandwidth())
		.attr("y",function(d){
			return y(d.value);
		})
		.attr("height",function(d){
			return height - y(d.value);
		})
		.on("mouseover",function(){
			tooltip.style("display",null)
		})
		.on("mouseout", function(d){
			tooltip.style("display","none")
			d3.select(this)
             .attr("x",x(d.key) )
             .attr("y", y(d.value) )         
             .attr("width",(x.bandwidth())  )
             .attr("height",(height - y(d.value)) )
             .style("fill","#B03A2E")
;
		})
		.on("mousemove",function(d){
			 var xPos=d3.mouse(this)[0]-50;
			 var yPos=d3.mouse(this)[1]-55;
			 tooltip.attr("transform","translate(" + xPos + ","+ yPos +")");
			 tooltip.select("text").text(d.key + ":" + d.value);

			 d3.select(this)
             .attr("x",x(d.key) )
             .attr("y", y(d.value)-10 )         
             .attr("width",(x.bandwidth()+10)  )
             .attr("height",(height - y(d.value)+10) )
              .style("fill","#008080");
;
		});

		var tooltip = svg.append("g")
			.attr("class",tooltip)
			.style("display","none");

		tooltip.append("text")
			.attr("x",15)
			.attr("dy","1.2em")
			.style("font-size","1.25em")
			.style("font-weight","bold");


}