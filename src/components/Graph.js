import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

// function Graph() {
//   return <div className="graph-container"></div>;
// }

function Graph() {
  const [data, setData] = useState({
    labels: [0],
    datasets: [
      {
        label: "ECG",
        borderColor: "rgb(255, 99, 132)",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
        lineTension: 0.5,
        showLine: true,
        borderJoinStyle: "round",
        // borderDash: [8, 4],
        data: [0]
      }
    ]
  });
  const [options, setOptions] = useState({
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            onRefresh: function() {
              let y = data;
              const newValue =
                sineWaveAt(y.datasets[0].data.length, 50) * 10 ** 15;
              console.log(newValue);
              y.labels.push(new Date());
              y.datasets[0].data.push(newValue);
              setData(y);
            },
            delay: 1000
          }
        }
      ]
    }
  });

  function sineWaveAt(sampleNumber, tone) {
    var sampleFreq = 100 / tone;
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)));
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("useEffect called");
  //     let x = data;
  //     const newValue = sineWaveAt(x.datasets[0].data.length, 50) * 10 ** 15;
  //     console.log(newValue);
  //     x.datasets[0].data.push(newValue);
  //     setData(x);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // });

  return (
    <div id="chart">
      <Line data={data} options={options} />
    </div>
  );
}

export default Graph;
