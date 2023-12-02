/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

function barlines(datase,range){
const barConfig = {
  type: 'bar',
  data: {
    labels: range,
    datasets:datase,
  },
  options: {
    responsive: true,
    legend: {
      display: true,
    },
  },
}
return  barConfig;

}
