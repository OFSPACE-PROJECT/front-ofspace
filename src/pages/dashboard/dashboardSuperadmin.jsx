import * as React from "react";
import TopBar from "../../components/superadmin/topbar";
import SidebarDashboard from "../../components/superadmin/sidebar";
import {Route, Routes} from "react-router-dom";
import UserData from "../../components/superadmin/userData";


export default function DashboardSuperadmin() {

	return (
		<div>
			<TopBar />
			<div style={{display: 'flex'}}>
				<SidebarDashboard/>
				<Routes>
					<Route exact path="/user" element={<UserData/>}/>
				</Routes>
			</div>
			{/*</Route>*/}
		</div>

	)
}