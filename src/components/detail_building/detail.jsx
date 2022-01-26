import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import BannerBuilding from "./banner";
import DescriptionBuilding from "./description";
import ModalChat from "../chat/modal";
import Card from "@mui/material/Card";
import BuildingInformation from "./buildingInformation";

export default function DetailBuilding(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [buildingData, setBuildingData] = useState([]);

	// useEffect( () => {
	// 	axios
	// 		// .get(`${process.env.REACT_APP_BASE_URL}/building/${props.id}`, {
	// 		.get(`${process.env.REACT_APP_BASE_URL}/building/9`, {
	// 			headers: {
	// 				accept: "*/*",
	// 				"Content-Type": "application/json",
	// 				Authorization: "Bearer " + props.user.token,
	// 			},
	// 		})
	// 		.then(function (response) {
	// 			console.log(response);
	// 			if (response.data.data != null) {
	// 				setBuildingData(response.data.data);
	// 			} else {
	// 				setError(true);
	// 			}
	// 			setLoading(false);
	// 		})
	// 		.catch(function () {
	// 			setError(true);
	// 			setLoading(false);
	// 		});
	// 	}, [])

	return (
		<Fragment>
		<BannerBuilding/>
		<DescriptionBuilding/>
			<BuildingInformation/>
			<Card width={400} height={400} color="secondary">For Booking</Card>
		</Fragment>
	)
}