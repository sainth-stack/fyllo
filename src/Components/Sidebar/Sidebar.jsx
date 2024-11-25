import React from "react"
import "./Sidebar.css"
import { Link, useLocation } from "react-router-dom"
import {
  TrendingUp,
  Inventory2
} from "@mui/icons-material"


function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className={`sidebarListItem ${currentPath === '/' ? 'active' : ''}`}>
                <TrendingUp className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
            <Link to="/product" className="link">
              <li className={`sidebarListItem ${currentPath === '/product' ? 'active' : ''}`}>
                <Inventory2 className="sidebarIcon" />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
