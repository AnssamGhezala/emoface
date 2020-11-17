import { useState } from 'react';
import Gallery from './Gallery';

function Configuration({ avatarName, setStaticImg }) {
	const [ activeTab, setActiveTab ] = useState('Happy');
	const [ selectedEmotion, setSelectedEmotion ] = useState('Happy');
	const emotions = [ 'Happy', 'Sad', 'Surprised', 'Angry' ];

	const handleTabClick = (emotion) => {
		setActiveTab(emotion);
		setSelectedEmotion(emotion);
	};

	return (
		<section id="configuration">
			<center style={{ marginBottom: '10px' }}>
				<b>
					<u>Emotion Configuration</u>
				</b>
			</center>
			<div id="tabs-container">
				<ul className="tabs">
					{emotions.map((emotion, idx) => (
						<li
							key={idx}
							onClick={() => handleTabClick(emotion)}
							className={activeTab === emotion ? 'active' : ''}
						>
							{emotion}
						</li>
					))}
				</ul>
			</div>
			<div id="tab-content">
				<span>Choose a {selectedEmotion.toLowerCase()} picture:</span>
				<Gallery avatarName={avatarName} emotion={selectedEmotion} setStaticImg={setStaticImg} />
			</div>
		</section>
	);
}

export default Configuration;
