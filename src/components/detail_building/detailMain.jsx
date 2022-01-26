import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import BannerBuilding from "./banner";
import DescriptionBuilding from "./description";
import ModalChat from "../chat/modal";
import Card from "@mui/material/Card";
import BuildingInformation from "./buildingInformation";
import DetailPhoto from "./detailPhoto";
import DetailFacility from "./facility";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/material";

export default function DetailBuilding(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [buildingData, setBuildingData] = useState([]);
	const [unitData, setUnitData] = useState([]);
	const {id, unit_id} = useParams()

	useEffect( () => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/building/${id}`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data.data != null) {
					setBuildingData(response.data.data);
				} else {
					setError(true);
				}
				setLoading(false);
			})
			.catch(function () {
				setError(true);
				setLoading(false);
			});
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/unit/${unit_id}`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data.data != null) {
					setUnitData(response.data.data);
				} else {
					setError(true);
				}
				setLoading(false);
			})
			.catch(function () {
				setError(true);
				setLoading(false);
			});
		}, [])

	const isLoading = loading;
	const isError = error;

	return (
		<Fragment>
		<BannerBuilding name={buildingData.name} image_url={buildingData.image_url} unit_type={unitData.unit_type} />
		<DescriptionBuilding description={buildingData.description}/>
			<BuildingInformation building={buildingData}/>
			<div style={{display: 'flex'}}>
			<DetailFacility id={buildingData.id} unit_id={unitData.id}/>
			<DetailPhoto id={buildingData.id} unit_id={unitData.id}/>
				<ModalChat building={buildingData} unit={unitData}/>
				{isLoading && (
					<Box>
						<LoadingButton
							loading
							variant="outlined"
							sx={{ backgroundColor: "white", borderRadius: 1 }}
							color="primary"
						>
							Detail Building
						</LoadingButton>
					</Box>
				)}
				{isError && (
					<Alert variant="standard" severity="error">
						Something went wrong, please try again later.
					</Alert>
				)}
			</div>
		</Fragment>
	)
}