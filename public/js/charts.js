var xmlhttp = new XMLHttpRequest();
var uri = window.location.href;
var id = uri.substring(uri.lastIndexOf('/') + 1);
var url = '/api/records/' + id;


// Progress Bar
[{time: 2000, percent: 40}, {time: 4000, percent: 80}].forEach(function(item){
  setTimeout(function(){ 
    $('.progress-bar').css('width', item.percent+'%').attr('aria-valuenow', item.percent);
  },item.time);
});

xmlhttp.onreadystatechange = function() {

  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    handler(xmlhttp.responseText);
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();


function handler(response){
    var parsedResponse = JSON.parse(response);
    var data = chartData(parsedResponse);
    $('.progress').hide();
    setupTempChart(data.dates, data.temps);
    setupLightChart(data.dates, data.lights);
    setupHumidityChart(data.dates, data.humidities);
    setupDataTable(parsedResponse);
}

function addTableRow(item) {
  var tbody = document.getElementById("tbody");
  var tr = document.createElement("tr");
  for (var key in item) {
    if (item.hasOwnProperty(key)) {
      var td = document.createElement("td");
      td.innerHTML = item[key];
      tr.appendChild(td);
    }
  }
  tbody.appendChild(tr);
}

function setupDataTable(data) {
  data.forEach(function(item){
    addTableRow(item); 
  });
}


function chartData(input) {
  var lights = input.map(function(item) { return item.light });
  var temps = input.map(function(item) { return item.temperature });
  var dates = input.map(function(item) { return item.time });
  var humidities = input.map(function(item) { return item.humidity });
  return {
    dates: dates,
      temps: temps,
      lights: lights,
      humidities: humidities
  };
}


function setupHumidityChart(labels, data) {
  var humidityCtx = document.getElementById("humidityChart");
  var myHumidityChart = new Chart(humidityCtx, {
    type: 'line',
      data: {
        labels: labels,
        datasets: [{
        label: 'Humidity',
        data: data,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      } 
  });
};



function setupLightChart(labels, data) {
  var lightCtx = document.getElementById("lightChart");
  var myLightChart = new Chart(lightCtx, {
    type: 'line',
      data: {
        labels: labels,
        datasets: [{
        label: 'Light',
        data: data,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      } 
  });
};

function setupTempChart(labels, data) {
  var tempCtx = document.getElementById("tempChart");
  var attributes = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
        label: 'Temperature', 
        data: data,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    } 
  }
  var myTempChart = new Chart(tempCtx, attributes);
};

