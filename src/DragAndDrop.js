import React from 'react';

const DragAndDrop = (props) => {
	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDrop = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		console.log(ev);
		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (ev.dataTransfer.items[i].kind === 'file') {
					var file = ev.dataTransfer.items[i].getAsFile();
					console.log(ev.dataTransfer.items[i]);
					console.log('... file[' + i + '].name = ' + file.name);
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.files.length; i++) {
				console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
			}
		}
	};
	return (
		<div
			className={'drag-drop-zone'}
			onDrop={(e) => handleDrop(e)}
			onDragOver={(e) => handleDragOver(e)}
			onDragEnter={(e) => handleDragEnter(e)}
			onDragLeave={(e) => handleDragLeave(e)}
		>
			<p>Drag files here to upload</p>
		</div>
	);
};
export default DragAndDrop;
