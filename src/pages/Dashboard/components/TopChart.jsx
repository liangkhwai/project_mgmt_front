import React from "react";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
const TopChart = ({ countStatus, max }) => {
  console.log(countStatus);
  if (!countStatus) return <div>loading...</div>;

  Chart.register(LinearScale, CategoryScale, BarElement);
  const data = {
    labels: [
      "ยังไม่ยื่นสอบหัวข้อ",
      "สอบหัวข้อ",
      "ยังไม่ยื่นสอบก้าวหน้า",
      "สอบก้าวหน้า",
      "ยังไม่ยื่นสอบป้องกัน",
      "สอบป้องกัน",
      "รอส่งปริญญานิพนธ์",
      "ส่งปริญญานิพนธ์แล้ว",
    ],
    datasets: [
      {
        // barPercentage: 1,
        // // barThickness: 6,
        // // maxBarThickness: 8,
        // minBarLength: 2,

        label: "Votes",
        data: countStatus,

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        // stepSize: stepSize,
        max: max,
        stacked: false,
      },
    },
  };

  return (
    <div className=" rounded-xl bg-white shadow-lg w-full h-full">
      <h2 className="text-start m-3">จำนวนกลุ่มในการสอบรอบต่างๆ</h2>
      <div className="w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopChart;
