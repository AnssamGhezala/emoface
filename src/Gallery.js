import ChildClass from './ChildClass';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

function Gallery({ avatarName, emotion }) {
	function importAll(r) {
		let images = {};
		r.keys().map((item, index) => {
			images[item.replace('./', '')] = r(item);
		});
		return images;
	}
	const path = `./media/${avatarName}/${emotion.toLowerCase()}`;

	return (
		<div id="gallery-container">
			<div className="emotion-container">
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
			<center className="upload-emotion">
				<Button variant="contained" color="primary">
					Add a {emotion.toLowerCase()} image
				</Button>
			</center>
		</div>
	);
}

export default Gallery;
