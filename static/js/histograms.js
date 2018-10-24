// var x = [];
// for (var i = 0; i < 500; i ++) {
// 	x[i] = Math.random();
// }
var y= [2,2,2]
var x= htmldata;


var trace = {
    x: x,
    type: 'histogram'
  };

var layout = {
  xaxis: {
    title: 'Overall Player Rating',
  },
  yaxis: {
    title: 'Number of Players per Rating',
  }
};


var data = [trace];
Plotly.newPlot('myDiv', data, layout);

console.log(attrsList)


