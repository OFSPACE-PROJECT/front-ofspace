import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
	toolbar: {zIndex:3000}
})
export default function TopBar() {
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles()
	const handleChange = (event) => {
		setAuth(event.target.checked);
	};


	return (
		// <Box sx={{ flexGrow: 1 }} className={classes.topbar}>

		<Box sx={{ flexGrow: 1}} className={classes.toolbar} >
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={auth}
							onChange={handleChange}
							aria-label="login switch"
						/>
					}
					label={auth ? 'Logout' : 'Login'}
				/>
			</FormGroup>
			<AppBar position="absolute">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Superadmin
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
