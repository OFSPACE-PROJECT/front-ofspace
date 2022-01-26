import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel'
import {Paper} from "@mui/material";
import axios from "axios";
import useToggle from "../../costumHooks/useToggle";
import {useState} from "react";
import {useSelector} from "react-redux";
import storage from "../../services/firebase";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 18,
	p: 4,
};

export default function ModalPhotoFloor({open, unit, handleClose, floor}, props) {

	return (

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}

				closeAfterTransition
				BackdropComponent={Backdrop}
			>
				{/*<Fade in={open}>*/}
					<Box sx={style}>
						<Carousel autoPlay={false}>
							{
								floor.map( (item, i) => <Item key={i} unit={unit} handleClose={handleClose} item={item}/> )
							}
						</Carousel>
						{/*<Typography id="transition-modal-title" variant="h6" component="h2">*/}
						{/*	Text in a modal*/}
						{/*</Typography>*/}
						{/*<Typography id="transition-modal-description" sx={{ mt: 2 }}>*/}
						{/*	Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
						{/*</Typography>*/}
					</Box>
				{/*</Fade>*/}
			</Modal>

	);
}


function Item(props)
{
	const user = useSelector((state) => state.persistedReducer?.user);
	const [descriptionEx, setDescription] = useState("")
	const [editOn, toggleEditOn] = useToggle()
	const [selectedImage, setSelectedImage] = useState(null)
	const [idExt, setIdx] = useState('')
	const [thisExterior, setThisExterior] = useState(props.item[idExt])

	const handleInputChange = (e) => {
		// setDisable(false);

		const newDesc = e.target.value;
		setDescription(newDesc)
	};
	const handleCancel = (e) => {
		toggleEditOn()

	}

	const handleSaveId = (e) => {
		const idnya= e.target.id
		setIdx(idnya)


	}
	const handleFirebase = () => {
		let reqFirebase = `/images/building/${props.unit?.id}/floor/${idExt}`
		if(selectedImage == null)
			return;
		storage.ref(reqFirebase).put(selectedImage)
			.on("state_changed" , alert("success upload image") , alert);
	}
	const handleUpdatePhoto = () => {

		let imageFromFirebase = `https://firebasestorage.googleapis.com/v0/b/ofspace-project.appspot.com/o/images%2Fbuilding%2F${props.unit?.id}%2Ffloor%2F${idExt}?alt=media&token=62809c58-ff5a-4f54-a813-9b42b18364fe`

		axios
			.put(
				`http://3.142.49.13:8080/building/${props.unit?.id}/floor/${idExt}`,
				{
					id: parseInt(idExt),
					building_id: props.unit?.id,
					photo_url: imageFromFirebase,
					description: descriptionEx
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				// setLoading(false);
				alert("success update photo")
				props.handleClose()
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});}

	const handleDeletePhoto = (e) => {

		axios
			.delete(
				`http://3.142.49.13:8080/building/${props.unit?.id}/floor/${idExt}`,
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert("success delete image")
				// setLoading(false);
			})
			.catch(function (error) {
				alert("fail delete image")
				// setError(error);
				// setLoading(false);
			});
	}

	const handleConfirmDelete = () => {
		let text
		if (window.confirm("Delete this Photo?") == true) {
			handleDeletePhoto()
		} else {
			text = "You canceled!";
		}
	}

	return (
		<Paper>
			{editOn?<> <input
				accept="image/*"
				type="file"
				required
				id="select-image"
				style={{ display: 'none' }}
				onChange={e => setSelectedImage(e.target.files[0])}
			/>
			<label htmlFor="select-image">
				<Button variant="contained" color="primary" component="span" >
					Change Building Image
				</Button>
			</label>
			{selectedImage ? (
				<Box mt={2} textAlign="center">
					<img src={URL.createObjectURL(selectedImage)} alt="Image Overview" height="500px" width="500px"/>
				</Box>
			) : null }
				<div style={{display: 'flex', flexDirection:'column',justifyContent: 'center'}}>
					<textarea
						value={descriptionEx}
						placeholder="New Description"
						name="description"
						rows="2"
						cols="50"
						onChange={(e) => handleInputChange(e)}/> <Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleCancel}>Cancel</Button>
					<Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={()=> {handleUpdatePhoto(); handleFirebase()}}>Confirm Update</Button></div>
				</>
				:
			<img src={props.item.photo_url} height="600px" width="600px" style={{alignItems:"center"}} alt={props.item.description}/>}
			<Typography align="center">{props.item.description}</Typography>
			<Box textAlign="center"><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleConfirmDelete} >Delete This Photo</Button>
			<Button variant="outlined" 	style={{color:'white', borderColor:'white'}} id={props.item.id} onClick={(e)=>{toggleEditOn(); handleSaveId(e)}}>Edit This Photo</Button>
			</Box>
		</Paper>
	)
}