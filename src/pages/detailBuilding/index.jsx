
import React from "react";
import DetailBuildingMain from "../../components/detail_building/detailMain";

export default function DetailBuilding(props) {
	const user = props.user
	return (
		<DetailBuildingMain user={user}/>
	);
}