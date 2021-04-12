// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var populate = (dataInput) => {

	dataInput.forEach(ufo_sightings => {
		var row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufo_sightings[column])
		)
	});
}

//Populate table
populate(data);

// Filter by attribute
button.on("click", () => {
	d3.event.preventDefault();
	var dateInput = d3.select("#datetime");
	var cityInput = d3.select("#city");
	var stateInput = d3.select("#state");
	var countryInput = d3.select("#country");
	var shapeInput = d3.select("#shape");
	
	var filtered = tableData.filter(et_sighting =>{
		return (et_sighting.datetime===dateInput.property("value") || !dateInput.property("value") ) && 
				  (et_sighting.city===cityInput.property("value") || !cityInput.property("value")) &&
				  (et_sighting.state===stateInput.property("value") || !stateInput.property("value")) &&
				  (et_sighting.country===countryInput.property("value") || !countryInput.property("value")) &&
				  (et_sighting.shape===shapeInput.property("value") || !shapeInput.property("value"))
	   })

	   console.log(dateInput.property("value"));
	   console.log(cityInput.property("value"));
	   console.log(stateInput.property("value"));
	   console.log(countryInput.property("value"));
	   console.log(shapeInput.property("value"));

	// Add filtered sighting to table
	tbody.html("");

	let response = {
		filterData, filterCity, filterDate
	}

	if (response.filterData.length !== 0) {
		populate(filterData);
	}
		else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
			populate(filterCity) || populate(filterDate);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found!"); 
		}
})

resetbtn.on("click", () => {
	tbody.html("");
	populate(data)
	console.log("Table reset")
})