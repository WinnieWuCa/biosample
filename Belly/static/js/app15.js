function buildMetadata(sample) { 

  var ul = d3.select(".panel-body");
// Use `.html("") to clear any existing metadata
  ul.html("");

    d3.json(`/metadata/${sample}`).then((metadata) => {
      console.log(metadata);

// Use `Object.entries` to add each key and value pair to the panel
      Object.entries(metadata).forEach(([key, value]) => { 
        console.log(`key = ${key}, value = ${value}`);
       
        ul.append("li").text(`${key} ${value}`);
        
        // var selection= ul.selectAll("li")
        //               .data(`${key} ${value}`)
        //               .enter()
        //               .append("li")
        //               .text(function(d){return d})
        //               //.text('${key} ${value}); 
      
;}) 
;}) 
}

function buildCharts(sample) {
// @TODO: Build a Pie Chart
console.log("last check");
  d3.json(`/samples/${sample}`).then(function(response) {

  var layout = {
    margin: { t: 0, l: 0 },
    title: "Pie Chart - Biodiversity",}; 
  
  var data = [{  
    values: response.sample_values.slice(0,10),
    labels: response.otu_ids.slice(0,10),
    type: "pie"
      }]; 

  var myGraph =document.getElementById("pie");
  Plotly.plot(myGraph, data, layout);
// @TODO:Build a Bubble Chart using the sample data
  var trace1 = { 
  x: response.otu_ids.slice(0,10),
  y: response.sample_values.slice(0,10),
  text: response.otu_labels.slice(0,10), 
  mode: "markers",
  marker: {
  //
  //  color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
 color: response.otu_ids.slice(0,10), 
 colorscale: "Earth",
 size: size=response.sample_values.slice(0,10)}}; 

  var data = [trace1];
  var layout = {
  title: "Bubble Chart - Biodiversity",
  showlegend: false,
  height: 600,
  width: 1000
  };

  Plotly.newPlot("bubble", data, layout);
});
}

function init() {
  // Grab a reference to the dropdown select element
  console.log("resize");
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
    console.log(`init() sample selected ${firstSample}`); 
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  console.log(newSample);
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
