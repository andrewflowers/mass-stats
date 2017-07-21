// Global variables
var geo_data;

// Map specifications
var map_width = 1500, map_height = 800;

var projection = d3.geo.statePlane("MA");

var path = d3.geo.path().projection(projection);

// Create map svg element
var svg = d3.select("body")
	.append("svg")
	.attr("width", map_width)
	.attr("height", map_height);

function create_map(geo_data) {

	towns = topojson.feature(geo_data, geo_data.objects.TOWNS_POLYM).features;

	console.log(towns);

	svg.selectAll("path")
		.data(towns)
		.enter()
		.append("path")
		.attr("d", path);

}

// Load geo data and create map
d3.json("mass_towns.json", function(error, geo_data) {
	
	if (error) {
		console.error(error);
		return null;
	}

	create_map(geo_data);
});