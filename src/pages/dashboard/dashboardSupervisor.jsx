import * as React from "react";
import SidebarDashboard from "../../components/supervisor/sidebar";
import {Route, Routes} from "react-router-dom";
import BuildingOverview from "../../components/supervisor/buildingOverview";
import TopBar from "../../components/supervisor/topbar";
import BookingOverview from "../../components/supervisor/bookingOverview";



export default function DashboardSupervisor() {

	return (
		// <div style={{display: 'flex'}}>

		<div>
		<TopBar />
		<div style={{display: 'flex'}}>
		<SidebarDashboard/>
				<Routes>
		<Route exact path="/bookingOverview" element={<BookingOverview/>}/>
		<Route exact path="/buildingOverview" element={<BuildingOverview/>}/>
				</Routes>
		</div>
		</div>

	)
}