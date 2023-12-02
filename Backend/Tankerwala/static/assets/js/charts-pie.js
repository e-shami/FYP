/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
function GenderGraph(male,female){
const pieConfig = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [male, female],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ['#0694a2', '#1c64f2'],
        label: 'Dataset 1',
      },
    ],
    labels: ['Male', 'Female'],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
  },
}
return pieConfig;
}



