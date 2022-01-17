import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {Routes, useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const drawerWidth = 240;
const useStyles = makeStyles({
	toolbar: {zIndex:1}
})

function SidebarDashboard(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const history = useNavigate()
	const classes = useStyles()
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};



	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				<ListItem button key="Sales Overview" onClick={() => history('/dashboard/salesOverview')}>
					<ListItemIcon>
						<MonetizationOnIcon/>
					</ListItemIcon>
					<ListItemText primary="Sales Overview" />
				</ListItem>
				<ListItem button key="Complex Overview" onClick={() => history('/dashboard/complexOverview')}>
					<ListItemIcon>
						<DonutLargeIcon/>
					</ListItemIcon>
					<ListItemText primary="Complex Overview" />
				</ListItem>
				<ListItem button key="Building Overview" onClick={() => history('/dashboard/buildingOverview')}>
					<ListItemIcon>
						<LocationCityIcon/>
					</ListItemIcon>
					<ListItemText primary="Building Overview" />
				</ListItem>

				<ListItem button key="Unit Overview" onClick={() => history('/dashboard/unitOverview')}>
					<ListItemIcon>
						<CropSquareIcon/>
					</ListItemIcon>
					<ListItemText primary="Unit Overview" />
				</ListItem>
				<ListItem button key="Booking Data">
					<ListItemIcon>
						<CropSquareIcon/>
					</ListItemIcon>
					<ListItemText primary="Booking Data" />
				</ListItem>
			</List>
			<Divider />
			<List>
				{['Inbox', 'Setting'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <SettingsOutlinedIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex',}} className={classes.toolbar}>
			{/*<CssBaseline />*/}
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				{/*<Toolbar>*/}
				{/*	<IconButton*/}
				{/*		color="inherit"*/}
				{/*		aria-label="open drawer"*/}
				{/*		edge="start"*/}
				{/*		onClick={handleDrawerToggle}*/}
				{/*		sx={{ mr: 2, display: { sm: 'none' } }}*/}
				{/*	>*/}
				{/*		<MenuIcon />*/}
				{/*	</IconButton>*/}
				{/*	<Typography variant="h6" noWrap component="div">*/}
				{/*		Supervisor Dashboard*/}
				{/*	</Typography>*/}
				{/*</Toolbar>*/}
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />

			</Box>
		</Box>
	);
}

SidebarDashboard.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default SidebarDashboard;
