// var x = [];
// for (var i = 0; i < 500; i ++) {
// 	x[i] = Math.random();
// }


// colors
// Grey: #F5F5F5
// Dark blue: #12356D
// light blue: #347AB6


var y = [2, 2, 2]
// var x = htmldata;


function buildCharts(x, attr) {
  // console.log(x)
  var trace = {
    x: x,
    type: 'histogram',
    showlegend: true,
    name: attr

  };

  var layout = {
    xaxis: {
      title: "Attribute: " + attr,
    },
    yaxis: {
      title: 'Number of Players per Rating',
    },
    title: attr + " Distribution",
    plot_bgcolor: "#F5F5F5",
    paper_bgcolor: "#F5F5F5"
  };

  var data = [trace];
  Plotly.newPlot('myDiv', data, layout);
}
// console.log(attrsList)

// var testdiv = document.getElementById('testdiv');
// testdiv.innerHTML += "<p style='color:white;'>Hello</p>";


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

  var defaultValue= attrsList[0]
  buildCharts(htmldata, defaultValue)
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected

  d3.json("/histograms/" + newSample).then((sampleNames) => {
    // console.log(sampleNames, "hello");
    buildCharts(sampleNames, newSample);
  }
    // buildMetadata(newSample);

  )
}


init();
