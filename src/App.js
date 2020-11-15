import './App.css';
import Rowan from './media/Rowan Atkinson/default.jpg';
import Configuration from './Configuration';
import { ThemeProvider, TextField, useTheme } from '@material-ui/core';

function App() {
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<div className="container">
					<section id="search">
						<TextField label="Search avatar..." variant="outlined" />
						<div id="avatars-container">
							<div id="avatars-wrapper">
								<div className="avatar">
									<div key="idx">
										<div className="avatar-img-wrapper">
											<img className="avatar-img" src={Rowan} alt="Rowan" />
										</div>
										<div className="avatar-name">Rowan Atkinson</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section id="video-output" />
					<Configuration avatarName="Rowan Atkinson" />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
