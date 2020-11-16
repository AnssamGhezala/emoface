import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import data from './pics/index';

function Gallery({ avatarName, emotion, setStaticImg }) {
	const [ images, setImages ] = useState(Object.keys(data[avatarName][emotion.toLowerCase()]));
	//const [ uploaded, setUploaded ] = useState({});
	const [ open, setOpen ] = useState(false);
	useEffect(
		() => {
			setImages(Object.keys(data[avatarName][emotion.toLowerCase()]));
		},
		[ avatarName, emotion ]
	);

	const handleClick = (image) => {
		setStaticImg(image);
		const fileReader = new FileReader();
	};

	const handleCapture = ({ target }) => {
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			handleClickOpen();
		};
		fileReader.readAsDataURL(target.files[0]);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div id="gallery-container">
			<div className="emotion-container">
				{images.map((image, idx) => (
					<div key={image} style={{ backgroundImage: `url(${image})` }} onClick={() => handleClick(image)} />
				))}
			</div>
			<center className="upload-emotion">
				<input
					onChange={handleCapture}
					accept="image/*"
					style={{ display: 'none' }}
					id="raised-button-file"
					type="file"
				/>
				<label htmlFor="raised-button-file">
					<Button variant="contained" color="primary" component="span">
						Add a {emotion.toLowerCase()} image
					</Button>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">{'Adding a new picture'}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Uploading a new picture is not yet supported by this prototype.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								OK
							</Button>
						</DialogActions>
					</Dialog>
				</label>
			</center>
		</div>
	);
}

export default Gallery;
