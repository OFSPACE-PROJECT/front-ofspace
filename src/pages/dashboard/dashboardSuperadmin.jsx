import TopBar from "../../components/supervisor/topbar";
import SidebarDashboard from "../../components/supervisor/sidebar";
import {Route, Routes} from "react-router-dom";
import BookingOverview from "../../components/supervisor/bookingOverview";
import BuildingOverview from "../../components/supervisor/buildingOverview";
import * as React from "react";


export default function DashboardSuperadmin() {

	return (
		// <div style={{display: 'flex'}}>

		<div>
			<TopBar />
			<div style={{display: 'flex'}}>
				<SidebarDashboard/>
				{/*<SalesOverview/>*/}
				{/*<Route index={true} element={<DashboardSupervisor/>}>*/}
				<Routes>
					<Route exact path="/bookingOverview" element={<BookingOverview/>}/>
					<Route exact path="/buildingOverview" element={<BuildingOverview/>}/>
					{/*<Route exact path="/unitOverview" element={<UnitOverview/>}/>*/}
				</Routes>
			</div>
			{/*</Route>*/}
		</div>

	)
}