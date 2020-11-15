import { useState } from 'react';
import Gallery from './Gallery';

function Configuration({avatarName}) {
	const [ activeTab, setActiveTab ] = useState('Happy');
	const [ selectedEmotion, setSelectedEmotion ] = useState('Happy');
	const emotions = [ 'Happy', 'Sad', 'Surprised' ];

	const handleTabClick = (emotion) => {
		setActiveTab(emotion);
		setSelectedEmotion(emotion);
	};
	

	return (
		<section id="configuration">
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
				<Gallery avatarName={avatarName} emotion={selectedEmotion}/>
			</div>
		</section>
	);
}

export default Configuration;
