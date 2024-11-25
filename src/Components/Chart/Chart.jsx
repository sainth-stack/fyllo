import { useState } from "react"
import { getData,capitalizeWords } from "../../utils.js"
import "./Chart.css"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CSVLink } from "react-csv";

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts"

const CHART_COLORS = {
  primary: '#6366F1',
  secondary: '#14B8A6',
  tertiary: '#F43F5E',
  quaternary: '#8B5CF6'
};

function Chart({
  title,
  data,
  dataKey,
  grid,
  parent,
  child,
  subtitle,
  defaultValue,
}) {
  let a = getData(data, parent, child)

  const [view, setView] = useState(defaultValue[parent])
  const [showExportOptions, setShowExportOptions] = useState(false)

  function OnchangeSetView(e) {
    setView(e.target.value)
  }

  const getCsvData = () => {
    return a[view].map(item => ({
      [capitalizeWords(child)]: item[child],
      Value: item.value
    }));
  };

  const exportToPDF = () => {
    const chartElement = document.querySelector('.chart');
    const options = {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true
    };

    html2canvas(chartElement, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.setFontSize(16);
      pdf.text(title, pdfWidth/2, 20, { align: 'center' });
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, pdfHeight - 10);
      
      pdf.save(`${title}_${view}_${new Date().toISOString().split('T')[0]}.pdf`);
      setShowExportOptions(false);
    });
  };

  return (
    <div className="chart">
      <div className="chartTitle">
        <h3 className="custom-font">{title}</h3>
        <div className="export-dropdown">
          <button 
            className="export-button custom-font"
            onClick={() => setShowExportOptions(!showExportOptions)}
          >
            Export ▼
          </button>
          <div className={`export-options ${showExportOptions ? 'active' : ''}`}>
            <CSVLink
              data={getCsvData()}
              filename={`${title}_${view}_${new Date().toISOString().split('T')[0]}.csv`}
              className="csv-link"
            >
              <button className="custom-font">Export to CSV</button>
            </CSVLink>
            <button onClick={exportToPDF} className="custom-font">Export to PDF</button>
          </div>
        </div>
      </div>
      <div className="chartSelect">
        <h5>
          {capitalizeWords(parent)} {subtitle}
        </h5>
        <select onChange={OnchangeSetView}>
          {Object.keys(a).map((e) => {
            return <option key={e} value={e}>{e}</option>
          })}
        </select>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={a[view]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
            <XAxis 
              dataKey={child} 
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
            />
            <YAxis 
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="value" 
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Chart
