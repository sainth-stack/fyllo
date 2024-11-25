import { useState } from "react"
import "./Bigchart.css"
import { CSVLink } from "react-csv"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  Legend,
} from "recharts"

function Bigchart({
  title,
  data
}) {
  const products = [
    "DAP",
    "MAP",
    "MOP",
    "NPK",
    "TSP",
    "UREA",
    "SSP"
  ]

  const [productValue, setProductValue] = useState(products[0])
  const [showExportMenu, setShowExportMenu] = useState(false)

  function OnchangeSetProductValue(e) {
    setProductValue(e.target.value)
  }

  let chartData = data
    .filter((obj) => obj.product === productValue)
    .reduce((acc, curr) => {
      const existingData = acc.find(item => item.month === curr.month && item._year === curr._year);
      if (existingData) {
        existingData.requirement_in_mt_ += parseFloat(curr.requirement_in_mt_) || 0;
        existingData.availability_in_mt_ += parseFloat(curr.availability_in_mt_) || 0;
      } else {
        acc.push({
          ...curr,
          requirement_in_mt_: parseFloat(curr.requirement_in_mt_) || 0,
          availability_in_mt_: parseFloat(curr.availability_in_mt_) || 0
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
console.log(chartData)
  const exportToPDF = () => {
    const chartElement = document.getElementById(`bigchart-${title}`)
    const options = {
      backgroundColor: '#ffffff',
      scale: 2
    }

    html2canvas(chartElement, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 190)
      pdf.save(`${title}-chart.pdf`)
    })
  }

  const csvData = chartData.map(item => ({
    month: item.month,
    requirement_in_mt_: item.requirement_in_mt_,
    availability_in_mt_: item.availability_in_mt_
  }))

  return (
    <div className="bigchart" id={`bigchart-${title}`}>
      <div className="bigchart-header">
        <h3 className="bigchartTitle custom-font">{title}</h3>
        <div className="export-dropdown">
          <button
            className="export-button"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <span>Export</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" />
            </svg>
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

      <div className="bigchartSelect">
        <h5 className="custom-font">Product</h5>
        <select onChange={OnchangeSetProductValue}>
          {products.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        {chartData.length ? null : (
          <h6 className="errordata custom-font">No data available to show</h6>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%" aspect={3.5 / 1}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="month"
            stroke="#555"
            tick={{ fill: '#555', fontSize: 12 }}
            tickLine={{ stroke: '#eee' }}
            axisLine={{ stroke: '#eee' }}
          />
          <YAxis
            stroke="#555"
            tick={{ fill: '#555', fontSize: 12 }}
            tickLine={{ stroke: '#eee' }}
            axisLine={{ stroke: '#eee' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '12px'
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="requirement_in_mt_"
            stroke="#2563EB"
            strokeWidth={2.5}
            dot={{ fill: '#2563EB', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
            name="Requirement (MT)"
          />
          <Line
            type="monotone"
            dataKey="availability_in_mt_"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            name="Availability (MT)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Bigchart
