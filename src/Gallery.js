import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function Gallery({ avatarName, emotion, setStaticImg }) {
	const [ images, setImages ] = useState([]);
	const [ open, setOpen ] = useState(false);
	const [ deleteOpen, setDeleteOpen ] = useState(false);
	const getAvatarPictures = () => {
		// const avatar_name = avatarName.toLowerCase().replace(' ', '_');
		const avatar_name = avatarName;
		fetch(`http://127.0.0.1:8000/emoface/${avatar_name}/${emotion.toLowerCase()}`)
			.then((response) => response.json())
			.then((data) => {
				setImages(data);
			});
	};
	useEffect(
		() => {
			getAvatarPictures();
		},
		[ avatarName, emotion ]
	);

	const handleClick = (image) => {
		// const avatar_name = avatarName.toLowerCase().replace(' ', '_');
		const avatar_name = avatarName;
		const formData = new FormData();

		formData.append('id', image.id);
		fetch(`http://127.0.0.1:8000/emoface/${avatar_name}/${emotion.toLowerCase()}`, {
			method: 'POST',
			body: formData
		})
			.then(() =>
				fetch(`http://127.0.0.1:8000/emoface/video`, {
					method: 'GET',
					headers: {
						'Content-Type': 'image/jpeg'
					}
				})
			)
			.then((response) => response.blob())
			.then((blob) => {
				var reader = new FileReader();
				reader.onload = function() {
					setStaticImg(this.result);
				}; // <--- `this.result` contains a base64 data URI
				reader.readAsDataURL(blob);
			});
	};

	const handleCapture = ({ target }) => {
		const fileReader = new FileReader();
		// const avatar_name = avatarName.toLowerCase().replace(' ', '_');
		const avatar_name = avatarName;
		fileReader.readAsDataURL(target.files[0]);
		fileReader.onload = (e) => {
			const thumb = fileReader.result.split(',')[1];

			const formData = new FormData();
			formData.append('image', thumb);
			formData.append('thumb', thumb);

			fetch(`http://127.0.0.1:8000/emoface/add/${avatar_name}/${emotion.toLowerCase()}`, {
				method: 'POST',
				body: formData
			}).then(() => getAvatarPictures());
		};
	};

	return (
		<div id="gallery-container">
			<div className="emotion-container">
				{images.length > 0 ? (
					images.map((image, idx) => (
						<div key={idx}>
							<div
								className="emotion-picture"
								style={{ backgroundImage: `url(${`data:image/jpeg;base64,${image.thumb}`})` }}
								onClick={() => handleClick(image)}
							/>
							<FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={() => setOpen(true)} />
						</div>
					))
				) : (
					<span>Loading...</span>
				)}
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
						Add {emotion.toLowerCase()} image
					</Button>
				</label>
			</center>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Are you sure that you want to delete this image?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">This action is irreversible.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setOpen(false)}
						className="delete-btn"
						style={{
							backgroundColor: 'blue'
						}}
					>
						No
					</Button>
					<Button
						onClick={() => {
							setOpen(false);
							setDeleteOpen(true);
						}}
						className="delete-btn"
						style={{
							backgroundColor: 'red'
						}}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Delete feature unavailable</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Unfortunately this prototype does not support the delete feature
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteOpen(false)}>Ok</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Gallery;
