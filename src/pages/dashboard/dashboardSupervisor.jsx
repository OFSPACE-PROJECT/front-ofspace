import SidebarDashboard from "../../components/supervisor/sidebar";
import {Route, Routes} from "react-router-dom";
import SalesOverview from "../../components/supervisor/salesOverview";
import BuildingOverview from "../../components/supervisor/buildingOverview";
import UnitOverview from "../../components/supervisor/unitOverview";
import * as React from "react";
import {Fragment} from "react";
import Login from "../../components/auth/login";
import TopBar from "../../components/supervisor/topbar";
import {makeStyles} from "@mui/styles";
import BookingOverview from "../../components/supervisor/bookingOverview";



export default function DashboardSupervisor() {

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