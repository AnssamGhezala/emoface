import './App.css';
import Configuration from './Configuration';
import {
	ThemeProvider,
	TextField,
	useTheme,
	Switch,
	FormControlLabel,
	Dialog,
	DialogActions,
	DialogContent,
	// DialogContentText,
	DialogTitle,
	Button
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import video from './video/video-output.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Avatar = ({ avatar, isSelected, selectAvatar }) => {
	return (
		<div className={'avatar' + (isSelected ? ' avatar-selected' : ' ')}>
			<div key="idx" onClick={() => selectAvatar(avatar)}>
				<div className="avatar-img-wrapper">
					<div
						className="avatar-img"
						style={{ backgroundImage: `url(${`data:image/jpeg;base64,${avatar.thumb}`})` }}
						alt="Rowan"
					/>
				</div>
				<div className="avatar-name">{avatar.name}</div>
			</div>
		</div>
	);
};

const PopUp = ({ open, setOpen, title, children, callBack }) => {
	const handleConfirm = () => {
		console.log('about to callback');
		callBack();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				{/* <DialogContentText id="alert-dialog-description">{message}</DialogContentText> */}
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleConfirm} color="primary">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

function App() {
	const theme = useTheme();
	const [ staticImg, setStaticImg ] = useState();
	const [ open, setOpen ] = useState(false);
	const [ mode, setMode ] = useState('static');
	const [ isCameraOn, setIsCameraOn ] = useState(true);
	const [ avatars, setAvatars ] = useState([]);
	const [ selectedAvatar, setSelectedAvatar ] = useState();
	const [ allAvatars, setAllAvatars ] = useState([]);
	const [ newAvatar, setNewAvatar ] = useState({ name: '', image: '', thumb: '' });

	const getAllAvatars = () => {
		return fetch('http://127.0.0.1:8000/emoface/').then((response) => response.json());
	};

	useEffect(() => {
		getAllAvatars().then((data) => {
			handleSelectAvatar(data[0]);
			setAllAvatars(data);
			setAvatars(data);
		});
	}, []);

	const handleSearch = (e) => {
		let result = [];

		allAvatars.forEach((avatar) => {
			if (avatar.name.includes(e.target.value)) {
				result.push(avatar);
			}
		});
		setAvatars(result);
	};

	const handleRealDetectionSwitch = () => {
		mode === 'static' ? setMode('real') : setMode('static');
	};
	const handleChangeCamera = () => {
		setIsCameraOn(!isCameraOn);
	};

	const handleAddNewAvatar = () => {
		console.log(newAvatar);
		const formData = new FormData();
		const { name, thumb, image } = newAvatar;
		formData.append('name', name);
		formData.append('thumb', thumb);
		formData.append('image', image);

		fetch(`http://127.0.0.1:8000/emoface/new_avatar`, {
			method: 'POST',
			body: formData
		})
			.then(() => getAllAvatars())
			.then((data) => {
				handleSelectAvatar({ name: name, thumb: thumb });
				setAllAvatars(data);
				setAvatars(data);
				return { name: name, thumb: thumb };
			});
	};

	const getVideoOutput = () => {
		fetch(`http://127.0.0.1:8000/emoface/video`, {
			method: 'GET',
			headers: {
				'Content-Type': 'image/jpeg'
			}
		})
			.then((response) => response.blob())
			.then((blob) => {
				var reader = new FileReader();
				reader.onload = function() {
					setStaticImg(this.result);
				}; // <--- `this.result` contains a base64 data URI
				reader.readAsDataURL(blob);
			});
	};

	const handleSelectAvatar = (avatar) => {
		setSelectedAvatar(avatar);
		const avatar_name = avatar.name;
		const formData = new FormData();
		formData.append('name', avatar_name);
		fetch(`http://127.0.0.1:8000/emoface/`, {
			method: 'POST',
			body: formData
		}).then(() => getVideoOutput());
	};

	const handleReadNewAvatar = ({ target }) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(target.files[0]);
		fileReader.onload = (e) => {
			const thumb = fileReader.result.split(',')[1];
			setNewAvatar({ ...newAvatar, thumb: thumb, image: thumb });
		};
		setOpen(true);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<div className="container">
					<section id="search">
						<TextField label="Search avatar..." variant="outlined" onChange={handleSearch} />
						<div id="avatars-container">
							<div id="avatars-wrapper">
								{avatars.length > 0 &&
									avatars.map((avatar, idx) => (
										<Avatar
											key={idx}
											avatar={avatar}
											isSelected={avatar.name === selectedAvatar.name}
											selectAvatar={handleSelectAvatar}
										/>
									))}
								{avatars.length === 0 && <span>No avatars found</span>}
							</div>
							<input
								onChange={handleReadNewAvatar}
								accept="image/*"
								style={{ display: 'none' }}
								id="add-button-file"
								type="file"
							/>
							<label htmlFor="add-button-file">
								<center id="add-avatar-btn">
									<FontAwesomeIcon icon={faPlusCircle} size="lg" />
									&nbsp;&nbsp;Add new avatar
								</center>
							</label>

							<PopUp
								open={open}
								setOpen={setOpen}
								title="Add a new avatar"
								message="Name of the new avatar:"
								callBack={handleAddNewAvatar}
							>
								<TextField
									autoFocus
									margin="dense"
									id="name"
									label="Name of new avatar"
									type="text"
									onChange={(e) => setNewAvatar({ ...newAvatar, name: e.target.value })}
									fullWidth
								/>
							</PopUp>
						</div>
					</section>
					<section id="video">
						<center id="camera-mode">
							<FormControlLabel
								control={
									<Switch
										className="camera-switch"
										checked={isCameraOn}
										onChange={handleChangeCamera}
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
								}
								label={`Video Output ${!isCameraOn ? '(disabled)' : '(enabled)'}`}
							/>
						</center>
						<div id="video-output" style={{ borderColor: `${isCameraOn ? '#e60000' : 'black'}` }}>
							{mode === 'real' && (
								<video autoPlay loop>
									<source src={video} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							)}
							{mode === 'static' &&
							staticImg && (
								<div
									style={
										!isCameraOn ? (
											{
												background: 'black'
											}
										) : (
											{
												backgroundImage: `url(${staticImg})`
											}
										)
									}
								/>
							)}
						</div>
						<div>
							<Switch
								checked={mode === 'real'}
								onChange={handleRealDetectionSwitch}
								color="primary"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
							<i>Detect facial expression</i>
						</div>
					</section>
					{selectedAvatar && <Configuration avatarName={selectedAvatar.name} setStaticImg={setStaticImg} />}
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
