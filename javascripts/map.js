// Global variables
var geo_data;

// Map specifications
var map_width = 1500, map_height = 800;

var projection = d3.geo.mercator()
	.center([-70, 50]) 
	.scale([map_width])
	.translate([map_width / 2, map_height / 2]);

var path = d3.geo.path().projection(projection);

// Create map svg element
var svg = d3.select("body")
	.append("svg")
	.attr("width", map_width)
	.attr("height", map_height);

function create_map(geo_data) {

	//towns = topojson.feature(geo_data, geo_data.objects.towns).features;
	towns = geo_data.objects.towns;
	console.log(towns);

	svg.selectAll("path")
		.data(towns.features)
		.enter()
		.append("path")
		.attr("d", path);

}

// Load geo data and create map
d3.json("../ma-towns.topojson", function(error, geo_data) {
	
	if (error) {
		console.error(error);
		return null;
	}

	create_map(geo_data);
});