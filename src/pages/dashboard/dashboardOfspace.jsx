import * as React from "react";
import TopBar from "../../components/teamOfspace/topbar";
import SidebarDashboard from "../../components/teamOfspace/sidebar";
import {Route, Routes} from "react-router-dom";
import ComplexData from "../../components/teamOfspace/complexData";
import Access from "../../components/teamOfspace/accessibility";
import Facility from "../../components/teamOfspace/facility";


export default function DashboardOfspace() {
	return (
		<div>
			<TopBar />
			<div style={{display: 'flex'}}>
				<SidebarDashboard/>
				<Routes>
					<Route exact path="/complex" element={<ComplexData/>}/>
					<Route exact path="/access" element={<Access/>}/>
					<Route exact path="/facility" element={<Facility/>}/>
				</Routes>
			</div>
			{/*</Route>*/}
		</div>

	)
}