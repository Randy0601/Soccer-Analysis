function buildMetadata(sample){
d3.json(`/metadata/${sample}`).then(function(sample) {
    console.log(`Data returned: ${sample}`)

    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");

    Object.entries(sample).map(function ([key, value]) {
        console.log(`Key: ${key} and Value ${value}`);
        var row = sample_metadata.append("p");
        row.text(`${key}: ${value}`);
       });
    }
)};

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
    //   buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  


function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    // buildCharts(newSample);
    buildMetadata(newSample);
  }

init();





var data = [{
    type: 'scatterpolar',
    r: [54, 59, 60, 44, 49, 54],
    theta: ['Stamina','Agility','Acceleration', 'Finishing', 'Crossing', 'Stamina'],
    fill: 'toself'
  }];
  
var layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100]
      }
    },
    showlegend: false
  };
  
  Plotly.plot("myDiv", data, layout);