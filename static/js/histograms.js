// color references
// Grey: #F5F5F5
// Dark blue: #12356D
// light blue: #347AB6

// // Dummy data for testing
// var y = [2, 2, 2]
// var x = htmldata;

// builds tthe chart
// takes 2 arguments: chart data (x) and the name of the trace (attr)
function buildCharts(x, attr) {
  var trace = {
    x: x,
    type: 'histogram',
    showlegend: true,
    name: attr
  };
  // layout for the chart
  var layout = {
    xaxis: {
      title: "Attribute: " + attr, //chart title
    },
    yaxis: {
      title: 'Number of Players',
    },
    title: attr + " Distribution",
    plot_bgcolor: "#F5F5F5", // inner plot bgcolor
    paper_bgcolor: "#F5F5F5"// outer plot bgcolor
  };

  var data = [trace];
  Plotly.newPlot('myDiv', data, layout);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  //clear htnml.
  document.getElementById("selDataset").innerHTML = "";

  // creates dropdown list from Flask variable
  attrsList.forEach((i) => {
    selector
      .append("option")
      .text(i)
      .property("value", i);

  });
  //set default value for plot to display. Displays first attribute in list
  var defaultValue = attrsList[0]
  buildCharts(htmldata, defaultValue)
}

//when selection is changed get new data and plot
function optionChanged(newSample) {
  // Fetch new data each time a new attribute is selected
  d3.json("/histograms/" + newSample).then((sampleNames) => {
    //call buildcharts with the new data
    buildCharts(sampleNames, newSample);
  });
}

//call function to create graphs
init();
