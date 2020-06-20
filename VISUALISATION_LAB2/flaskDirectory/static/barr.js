function scree_plots() {

    var dropdown = document.getElementById("scree_plots");
    var Value = dropdown.options[dropdown.selectedIndex].value;
    
     if (Value=="orig") 
        button1("/original_data_scree");
    else if(Value=="rand")
        button1("/random_data_scree");
    else (Value=="strat")
        button1("/stratified_data_scree" );
    
}

function mds_cor() {

    var dropdown = document.getElementById("mds_cor");
    var Value = dropdown.options[dropdown.selectedIndex].value;
    
     if (Value=="orig") 
        button2("/mds_original_correlation");
    else if(Value=="rand")
        button2("/mds_random_correlation");
    else (Value=="strat")
        button2("/mds_stratified_correlation" );
    
}

function mds_euc() {

    var dropdown = document.getElementById("mds_euc");
    var Value = dropdown.options[dropdown.selectedIndex].value;
    
     if (Value=="orig") 
        button3("/scatter_matrix_original");
    else if(Value=="rand")
        button3("/mds_random_euclidean");
    else (Value=="strat")
        button3("/pca_scatter_stratified" );
    
}

function pca() {

    var dropdown = document.getElementById("pca");
    var Value = dropdown.options[dropdown.selectedIndex].value;
    
     if (Value=="orig") 
        button4("/mds_original_correlation");
    else if(Value=="rand")
        button4("/pca_scatter_random");
    else (Value=="strat")
        button4("/mds_stratified_correlation" );
    
}

function matrix() {

    var dropdown = document.getElementById("matrix");
    var Value = dropdown.options[dropdown.selectedIndex].value;
    
     if (Value=="orig") 
        button5("/mds_original_correlation");
      else if(Value=="rand")
        button5("/scatter_matrix_random");
      else (Value=="strat")
        button5("/scatter_matrix_stratified" );
    
}

function button1(url){
  $.ajax({

    type:"POST",
    url: url,
    dataType:'json',
    success: function(data){
      bar(data);
    }
  })

}

function button2(url){ 
$.ajax({

    type:"POST",
    url: url,
    dataType:'json',
    success: function(data){
      scatterplot(data);
    }
  })
}

function button3(url){ 
$.ajax({

    type:"POST",
    url: url,
    dataType:'json',
    success: function(data){
      scatterplot(data);
    }
  })
}

function button4(url){ 
$.ajax({

    type:"POST",
    url: url,
    dataType:'json',
    success: function(data){
      scatterplot(data);
    }
  })
}

function button5(url){ 
$.ajax({

    type:"POST",
    url: url,
    dataType:'json',
    success: function(data){
      scattermatrix(data);
    }
  })
}

function bar(data){  
    // svg.selectAll("*").remove();


  var dataset = data['datapoints'];
  var cumulative = data['cumulative'];
  var intrinsic = data['intrinsic'];

  console.log(cumulative)

    var point_x
    var point_y

    var svg = d3.select("#bar")
,
    margin = {top: 100, right: 50, bottom: 30, left: 90},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

    var svg = svg.append("g").attr("class","svg2")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(dataset.map(function(d) { return d.A; }));
    y.domain([0, 100]);

    svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).tickFormat(function(d){
    return d+"%";
   }).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.A); })
      .attr("y", function(d) { return y(d.B); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.B); });



     svg.append("path")
      .datum(cumulative)
      .attr("class", "line")
      .attr("d", d3.line()
      .x(function(d,i) { if (i==intrinsic-1){point_x =x(i+1)+x.bandwidth()/2;
                             point_y=y(d);}
                 return x(i+1)+x.bandwidth()/2;})
      .y(function(d) { return y(d);})
      )
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5);

    svg.append("circle")
       .attr("cx", point_x)
       .attr("cy", point_y)
       .attr("r", 5)
       .attr("fill", "orange");
    


 }











function scatterplot(data){

  
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


var svg = d3.select("svg").attr("class","svg2")

    var svg=d3.select("#bar")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.A; }));
  y.domain(d3.extent(data, function(d) { return d.B; }));

  // Add the scatterplot
  svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.A); })
      .attr("cy", function(d) { return y(d.B); });

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

}

function scattermatrix(data4){

    data0=data4['A'];
    data1=data4['B'];
    data2=data4['C'];
    // var traits = Object.keys(data4);

    var svg = d3.select("#bar").attr("class","svg2")

    var width = 960,
    size = 230,
    padding = 20;

  var x = d3.scaleLinear()
    .range([padding / 2, size - padding / 2]);

    var y = d3.scaleLinear()
    .range([size - padding / 2, padding / 2]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(6);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(6);

data = {};
    data[0] = data0
    data[1] = data1
    data[2] = data2

  var domainByTrait = {},
      traits = d3.keys(data),
      n = traits.length;

  traits.forEach(function(trait) {
    domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
  });

  xAxis.tickSize(size * n);
  yAxis.tickSize(-size * n);

  

  var svg = d3.select("body").append("svg")
      .attr("width", size * n + padding)
      .attr("height", size * n + padding)
    .append("g")
      .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

  svg.selectAll(".x.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "x axis")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

  svg.selectAll(".y.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "y axis")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

  var cell = svg.selectAll(".cell")
      .data(cross(traits, traits))
    .enter().append("g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);

  // Titles for the diagonal.
  cell.filter(function(d) { return d.i === d.j; }).append("text")
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d) { return d.x; });


  function plot(p) {
    var cell = d3.select(this);

    x.domain(domainByTrait[p.x]);
    y.domain(domainByTrait[p.y]);

    cell.append("rect")
        .attr("class", "frame")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding);

        f_comp = data[p.x];
        s_comp = data[p.y];
        res = []
        s = d3.values(s_comp)
          // cluster = data['clusterid']
          //console.log(cluster)
          d3.values(f_comp).forEach(function(item, index) {
              temp = {};
              temp["x"] = item;
              temp["y"] = s[index];
              // temp["clusterid"] = cluster[index];
              res.push(temp);
    });
  }

    cell.selectAll("circle")
        .data(res)
        .enter().append("circle")
        .attr("cx", function(d) { return x(d[p.x]); })
        .attr("cy", function(d) { return y(d[p.y]); })
        .attr("r", 4);  

  }


function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
  return c;
}

  



    
    
  
  

