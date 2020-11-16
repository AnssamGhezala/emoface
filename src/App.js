import './App.css';
import Rowan from './pics/rowan_atkinson/default.jpg';
import Configuration from './Configuration';
import { ThemeProvider, TextField, useTheme, Switch, FormControlLabel } from '@material-ui/core';
import rowan_happy1 from './pics/rowan_atkinson/happy/rowan_happy1.jpg';
import { useState } from 'react';
import video from './video/video-output.mp4';

function App() {
	const theme = useTheme();
	const [ staticImg, setStaticImg ] = useState(rowan_happy1);

	const [ mode, setMode ] = useState('static');
	const [ isCameraOn, setIsCameraOn ] = useState(true);
	//const [ emotionImg, setEmotionImg ] = useState({});
	const [ avatars, setAvatars ] = useState([ { name: 'Rowan Atkinson', img: Rowan } ]);
	const handleSearch = (e) => {
		console.log('rowan atkinson'.includes(e.target.value));
		'rowan atkinson'.includes(e.target.value)
			? setAvatars([ { name: 'Rowan Atkinson', img: Rowan } ])
			: setAvatars([]);
	};

	const handleRealDetectionSwitch = () => {
		mode === 'static' ? setMode('real') : setMode('static');
	};
	const handleChangeCamera = () => {
		setIsCameraOn(!isCameraOn);
	};
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<div className="container">
					<section id="search">
						<TextField label="Search avatar..." variant="outlined" onChange={handleSearch} />
						<div id="avatars-container">
							<div id="avatars-wrapper">
								{avatars.map((avatar) => (
									<div className="avatar" key={avatar.name}>
										<div key="idx">
											<div className="avatar-img-wrapper">
												<img className="avatar-img" src={avatar.img} alt="Rowan" />
											</div>
											<div className="avatar-name">{avatar.name}</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
					<section id="video">
						<div id="camera-mode">
							<FormControlLabel
								value="female"
								control={
									<Switch
										className="camera-switch"
										checked={isCameraOn}
										onChange={handleChangeCamera}
										color="primary"
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
								}
								label={`Video output ${!isCameraOn ? '(disabled)' : ''}`}
							/>
						</div>
						<div id="video-output">
							{mode === 'real' && (
								<video autoPlay loop>
									<source src={video} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							)}
							{mode === 'static' && <div style={{ backgroundImage: `url(${staticImg}` }} /> }
						</div>
						<div>
							<Switch
								checked={mode === 'real'}
								onChange={handleRealDetectionSwitch}
								color="primary"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
							Detect facial expression
						</div>
					</section>

					<Configuration avatarName="Rowan Atkinson" setStaticImg={setStaticImg} />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
