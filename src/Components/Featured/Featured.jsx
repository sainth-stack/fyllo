import { data } from "../../result.js"
import "./Featured.css"
import Chart from "../Chart/Chart"
import Bigchart from "../Bigchart"
import Piechart from "../Piechart"

function Featured() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="widgetsm">
          <h3 className="custom-font">Total Users</h3>
          <div className="widgetsmValue custom-font">1,234</div>
        </div>
        <div className="widgetsm">
          <h3 className="custom-font">Total Revenue</h3>
          <div className="widgetsmValue custom-font">$45,678</div>
        </div>
        <div className="widgetsm">
          <h3 className="custom-font">Total Orders</h3>
          <div className="widgetsmValue custom-font">890</div>
        </div>
      </div>
      <div className="featuredpiechart">
        <div className="charts-row">
          <Piechart
            data={data}
            title="Top 5 Required products"
            dataKey="requirement_in_mt_"
          />
          <Piechart
            data={data}
            title="Top 5 Available products"
            dataKey="availability_in_mt_"
          />
          <Chart
            data={data}
            title="State wise product"
            grid={false}
            parent="state"
            child="product"
            defaultValue={data[0]}
          />
        </div>
      </div>

      <div className="featuredbigchart">
        <Bigchart
          data={data}
          title="Product Availability and Requirements"
          grid
        />
      </div>
    </div>
  )
}

export default Featured
