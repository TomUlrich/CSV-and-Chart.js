'use strict';

const xlabels = [];
const ytemps = [];

drawChart();

async function drawChart() {
  await getData();
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [
        {
          label: 'Zonal annual means from 1880 to present in C°',
          data: ytemps,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value, index, ticks) {
              return value + '°';
            },
          },
        },
      },
    },
  });
}

async function getData() {
  const response = await fetch('ZonAnn.Ts+dSST.csv');
  const data = await response.text();

  const table = data.split('\n').slice(1);
  table.forEach((row) => {
    const columns = row.split(',');
    const year = columns[0];
    const temp = columns[1];
    console.log(year, temp);
    xlabels.push(year);
    ytemps.push(parseFloat(temp) + 14);
  });
}
