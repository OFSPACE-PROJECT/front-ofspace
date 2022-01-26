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
import {Alert, MenuItem} from "@mui/material";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

export default function DetailBuilding(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [buildingData, setBuildingData] = useState([]);
	const [unitData, setUnitData] = useState([]);
	const { id } = useParams()
	const [unitId, setUnitId] = useState(0)
	const user = useSelector((state) => state.persistedReducer.user)

	useEffect( () => {

		axios
			// .get(`${process.env.REACT_APP_BASE_URL}/building/${id}`, {
			.get(`${process.env.REACT_APP_BASE_URL}/building/9`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					// Authorization: "Bearer " + props.user.token,props
					Authorization: "Bearer " + user.token,
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
		}, [])



	const isLoading = loading;
	const isError = error;
	// console.log("new unit", buildingData.units[0])
	// "office" === listUnit[0].unit_type ? setUnitData(listUnit[0]) : setUnitData(listUnit[1])
	// console.log("this data", unitData)

	// console.log("unitId", unitId)
	return (
		<Fragment>

		<BannerBuilding setUnitId={setUnitId} isLoading={isLoading} buildingData={buildingData} name={buildingData.name} image_url={buildingData.image_url} />
			<DescriptionBuilding description={buildingData.description}/>
			<BuildingInformation buildingData={buildingData}/>
			<div style={{display: 'flex'}}>
				{!isLoading && unitId!== 0 && <DetailFacility user={user} id={buildingData.id} unit_id={unitId}/>}
				{!isLoading && unitId !== 0 && <DetailPhoto user={user} id={buildingData.id} unit_id={unitId}/>}
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