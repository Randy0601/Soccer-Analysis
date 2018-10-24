// var x = [];
// for (var i = 0; i < 500; i ++) {
// 	x[i] = Math.random();
// }
var y= [2,2,2]
var x= htmldata;


function buildCharts(x) {
  console.log(x)
  var trace = {
    x: x,
    type: 'histogram'
  };
  var layout = {
    showlegend: true
  };

  var data = [trace];
  Plotly.newPlot('myDiv', data, layout);
}
// console.log(attrsList)

var testdiv = document.getElementById('testdiv');
testdiv.innerHTML += "<p style='color:white;'>Hello</p>";


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  
  attrsList.forEach((i) => {
    selector
      .append("option")
      .text(i)
      .property("value", i);
    

    // Use the first sample from the list to build the initial plots
    // const overall = sampleNames[0];
    // buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
  buildCharts(htmldata)
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected

  d3.json("/histograms/"+newSample).then((sampleNames) => {
    console.log(sampleNames, "hello");
    buildCharts(sampleNames);
  }
  // buildMetadata(newSample);

)}


init();
