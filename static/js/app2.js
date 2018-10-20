var tabledata = d3.json(`/player_table`);
console.log(tabledata);
var tbody = d3.select("tbody");

function buildData(player_attr) {
d3.json(`/player_table`).then((player) =>{
  console.log(player)
    Object.entries(player).map(function([key, value]) {
        // console.log(`Key: ${key} and Value ${value}`);
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
};

function filterData(inputData) {
    d3.event.preventDefault();
    tbody.html("");

    var inputElement = d3.select("#player");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Player: ${inputValue}`);
      var filteredData = tableData.filter(data => data.player_fifa_api_id === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#stamina");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Stamina: ${inputValue}`);
      var filteredData = tableData.filter(data => data.stamina === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#agility");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Agility: ${inputValue}`);
      var filteredData = tableData.filter(data => data.agility === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#acceleration");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Acceleration: ${inputValue}`);
      var filteredData = tableData.filter(data => data.acceleration === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#finishing");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Finishing: ${inputValue}`);
      var filteredData = tableData.filter(data => data.finishing === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#crossing");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Crossing: ${inputValue}`);
      var filteredData = tableData.filter(data => data.crossing === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#overall_rating");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter Overall_Rating: ${inputValue}`);
      var filteredData = tableData.filter(data => data.overall_rating === inputValue); 
      console.log(filteredData);
    }

    var inputElement = d3.select("#preferred_foot");
    var inputValue = inputElement.property("value").trim();
    if (inputValue != ""){
      console.log(`Filter preferred_foot: ${inputValue}`);
      var filteredData = tableData.filter(data => data.preferred_foot === inputValue.toLowerCase()); 
      console.log(filteredData);
    }

    filteredData.map((player_attribute) => {
        var row = tbody.append("tr");
        Object.entries(player_attribute).map(([key,value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });
        
     return filteredData;
});
};

d3.select("#filter-btn").on("click", filterData);
buildData();