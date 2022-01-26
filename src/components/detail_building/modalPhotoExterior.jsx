import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel'
import {Paper} from "@mui/material";

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

export default function ModalPhotoExterior({open, handleClose, exterior}, props) {
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
				<Carousel>
					{ exterior ?
						exterior.map( (item, i) => <Item key={i} handleClose={handleClose} item={item}/> ) : null
					}
				</Carousel>
			</Box>
		</Modal>

	);
}


function Item(props)
{

	return (
		<Paper>
				<img src={props.item.photo_url} height="600px" width="600px" style={{alignItems:"center"}} alt={props.item.description}/>
			<Typography align="center">{props.item.description}</Typography>
		</Paper>
	)
}
