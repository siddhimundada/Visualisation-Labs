function hist(map,bins,a){
	//var b=bins;
d3.selectAll(".svg2").remove();
// document.getElementById("myRange").value="15";

document.getElementById("myRange").disabled = false;


//document.getElementById("myRange").value="15";
	var margin = {top: 20, right: 20, bottom: 100, left: 60},
		width=1000 - margin.left-margin.right,
		height=500-margin.top-margin.bottom,
		x     = d3.scaleLinear().range([0,width]);
		y     = d3.scaleLinear().range([height,0]);
	console.log(a)


		x.domain([d3.min(map),d3.max(map)])

		var histogram=d3.histogram()
		.value(function(d){return d;})
		.domain(x.domain())
		.thresholds(x.ticks(bins))
		(map)
		//console.log(histogram)
		
		y.domain([0,d3.max(histogram.map(function (i){
			return i.length;
		}))])

		var xAxis = d3.axisBottom()
		.scale(x)
		.ticks(bins)

		var yAxis = d3.axisLeft()
			.scale(y)
			.ticks(8);

		var svg = d3.select("#hist")
		.append("svg")
		.attr("width",width+margin.left+margin.right+100)
		.attr("height",height+ margin.top + margin.bottom+50)
		.attr("class","svg2")
		.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")" );

		svg.append("g")
		.attr("class", "x axis")
		.attr("transform","translate(0, " + height + ")")
		.attr("stroke-width", '2px')
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor","end")
		.style("font-size","1.5em")
		.attr("dx","-0.5em")
		.attr("dy","-.55em")
		.attr("y", 30)
		.attr("transform","rotate(-45)");

		svg.append("text") 
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (margin.left/2-70) +","+(height/2)+")rotate(-90)")
          // text is drawn off the screen top left, move down and out and rotate
            .text("Frequency")
            .style("font-weight","bold")
            .style("font-size","1.5em");	

		svg.append("g")
		.attr("class" , "y axis")
		.attr("stroke-width", '2px')
		.call(yAxis)
		.selectAll("text")
		.attr("font-size","1.5em")
		.attr("transform","rotate(0)")
		.attr("y",5)
		.attr("dy","0.8em")
		.attr("text-anchor","end")
		
		svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3)+140)+")rotate(0)")
        .text(a)
        .style("font-weight","bold")
        .style("font-size","1.5em");	

		

		svg.selectAll("bar")
		.data(histogram)
		.enter()
		.append("rect")
		.style("fill","#B03A2E")
		.attr("x",function(d){
			return x(d.x0);
		})
		.attr("width",function(d){return x(d.x1)-x(d.x0);})
		.attr("y",function(d){
			return y(d.length);
		})
		.attr("height",function(d){
			return height-y(d.length);
		})

		.on("mouseover",function(){
			tooltip.style("display",null)
		})
		.on("mouseout", function(d){
			tooltip.style("display","none")
			d3.select(this)
    //         // .transition().duration(500)
             .attr("x",x(d.x0) )
             .attr("y", y(d.length) )         
             .attr("width",x(d.x1) -x(d.x0) )
             .attr("height",height-y(d.length) )
             .style("fill","#B03A2E");
		})
		.on("mousemove",function(d){
			 var xPos=d3.mouse(this)[0]-30;
			 var yPos=d3.mouse(this)[1]-55;

			 tooltip.attr("transform","translate(" + xPos + ","+ yPos +")");
			 tooltip.select("text").text(d.length);

			  d3.select(this).attr('class','bar')
    //         // .transition().duration(500)
             .attr("x",x(d.x0) -5)
             .attr("y", y(d.length)-15)         
             .attr("width",x(d.x1) -x(d.x0) +10 )
             .attr("height",height-y(d.length)+15 )
             .style("fill","#008080");

   
		});

		var tooltip = svg.append("g")
			.attr("class",tooltip)
			.style("display","none")
			.text("");

		tooltip.append("text")
			.attr("x",15)
			.attr("dy","1.2em")
			.style("font-size","1.5em")
			.style("font-weight","bold");
;


		changeBinWidth(map,bins,a);

	//document.getElementById("myRange").value="15";
}

function changeBinWidth(map,bins,a){
	 	d3.select("#slider").on("mousedown", function() {
 
	 	    var slider = document.getElementById("myRange");
			slider.oninput = function() {
				d3.selectAll(".svg2").remove();
				var s=Math.abs(slider.value)
  					hist(map,s,a)
			}
		})
}
		
		
	
	

