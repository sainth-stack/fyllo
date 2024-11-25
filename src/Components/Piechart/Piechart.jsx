import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import "./Piechart.css"
import { getPieData } from "../../utils.js"
import { CSVLink } from "react-csv"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useState } from "react"
import { ResponsiveContainer } from "recharts"

const REQUIREMENT_COLORS = ["#4361EE", "#3A0CA3", "#7209B7", "#F72585", "#4CC9F0"]
const AVAILABILITY_COLORS = ["#6C5CE7", "#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: '14px', fontWeight: 'bold' }}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

function Piechart({ data, title, dataKey }) {
  let chartData = getPieData(data, dataKey)

  const [showExportMenu, setShowExportMenu] = useState(false);

  const exportToPDF = () => {
    const chartElement = document.getElementById(`piechart-${title}`);
    const options = {
      backgroundColor: '#ffffff',
      scale: 2
    };

    html2canvas(chartElement, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 190);
      pdf.save(`${title}-chart.pdf`);
    });
  };


  const csvData = chartData.map(item => ({
    name: item.name,
    value: item.value
  }));

  // Determine which color scheme to use based on the title
  const colorScheme = title.includes("Required") ? REQUIREMENT_COLORS : AVAILABILITY_COLORS

  return (
    <div className="piechart" id={`piechart-${title}`}>
      <div className="piechart-header">
        <h3 className="piechartTitle custom-font">{title}</h3>
        <div className="export-dropdown">
          <button
            className="export-button custom-font"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            Export ▼
          </button>
          {showExportMenu && (
            <div className="export-menu">
              <button onClick={exportToPDF} className="custom-font">Export as PDF</button>
              <CSVLink
                data={csvData}
                filename={`${title}-chart.csv`}
                className="csv-link"
              >
                <button className="custom-font">Export as CSV</button>
              </CSVLink>
            </div>
          )}
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="90%"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorScheme[index % colorScheme.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${((value / chartData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Piechart
