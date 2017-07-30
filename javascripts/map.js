// Global variables
var geo_data;

// Map specifications
var map_width = 700, map_height = 500;

var projection = d3.geo.mercator()
	.center([71, 42]) 
	.scale([map_width*500]);
	//.translate([map_width / 2, map_height / 2]);

var path = d3.geo.path().projection(projection);

// Create map svg element
var map_svg = d3.select("body")
	.append("svg")
		.attr("width", map_width)
		.attr("height", map_height)
		.attr("id", "map_svg");

function create_map(geo_data) {

	console.log(geo_data);

	towns = topojson.feature(geo_data, geo_data.objects.TOWNS_POLYM).features;
	
	map_svg.selectAll("path")
		.data(towns)
		.enter()
		.append("path")
		.attr("d", path);

}

// Load geo data and create map
d3.json("../mass_towns.json", function(error, geo_data) {
	
	if (error) {
		console.error(error);
		return null;
	}

	create_map(geo_data);
});