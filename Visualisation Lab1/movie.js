function runtime(){
  document.getElementById("myRange").value = "-15";

var bins=15;
var ab="Runtime";

	d3.csv("MOVIE.csv",function(data){

		 var map1=data.map(function(i){
		 	return parseInt(i.Runtime);})

		 

		hist(map1,bins,ab);
	})
}

function year(){
  document.getElementById("myRange").value = "-15";

var bins=15;
var ab="Year";

	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return parseInt(i.Year);})

		hist(map2,bins,ab);
	})
}

function imdb(){
	  document.getElementById("myRange").value = "-15";

var bins=15;
var ab="IMDB Rating";

	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return parseFloat(i.imdbRating);})

		hist(map2,bins,ab);
	})
}

function popularity(){
	  document.getElementById("myRange").value = "-15";

var bins=15;
var ab="Popularity";

	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return parseFloat(i.popularity2);})

		hist(map2,bins,ab);
	})
}


function totalVotes(){
	  document.getElementById("myRange").value = "-15";

var bins=15;
var ab="Total Votes";

	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return parseInt(i.totalVotes);})

		 hist(map2,bins,ab);
	})
	

}

function budget(){
	  document.getElementById("myRange").value = "-15";

var bins=15;
var ab="Budget";

	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return parseInt(i.budget2);})

		hist(map2,bins,ab);
	})
}

function country(){
var ab="Country";


	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return (i);})

		//graph(map2);
		var map=d3.nest()
	.key(function(d){
		return d.Country;
	})
	.rollup(function(v){return v.length;})
	.entries(map2);

	graph(map,ab);
})
}

function genre(){
var ab="Genre";


	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return (i);})

		//graph(map2);
		var map=d3.nest()
	.key(function(d){
		return d.Genre;
	})
	.rollup(function(v){return v.length;})
	.entries(map2);

	graph(map,ab);
})
}

function language(){
	var ab="Language";


	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return (i);})

		//graph(map2);
		var map=d3.nest()
	.key(function(d){
		return d.Language;
	})
	.rollup(function(v){return v.length;})
	.entries(map2);

	graph(map,ab);
})
}

function production(){
	var ab="Production";


	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return (i);})

		//graph(map2);
		var map=d3.nest()
	.key(function(d){
		return d.Production;
	})
	.rollup(function(v){return v.length;})
	.entries(map2);

	graph(map,ab);
})
}

function rated(){
	var ab="Rated";


	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return (i);})

		//graph(map2);
		var map=d3.nest()
	.key(function(d){
		return d.Rated;
	})
	.rollup(function(v){return v.length;})
	.entries(map2);

	graph(map,ab);
})
}

function resp(){
	var ab="Basis";


	d3.csv("MOVIE.csv",function(data){

		 var map2=data.map(function(i){
		 	return (i);})

		//graph(map2);
		var map=d3.nest()
	.key(function(d){
		return d.Responsibility;
	})
	.rollup(function(v){return v.length;})
	.entries(map2);

	graph(map,ab);
})
}
