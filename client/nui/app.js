var displayPicture = false;

function setLocation(location) {
	if (location) {
		$('#location').text(location);
	} else {
		$('#location').text('Unknown');
	}
}

function open(image) {
	if (!displayPicture) {
		$('.picture-container').fadeIn('slow');
		$('.picture').css({
			background: `url(${image})`,
		});

		displayPicture = true;
	}
}

function close() {
	if (displayPicture) {
		$('.picture-container').fadeOut('fast');
		$('#location').html('');
		$('.picture').css({ background: '' });
		displayPicture = false;
		$.post(`https://${GetParentResourceName()}/close`);
	}
}

$(document).ready(function () {
	window.addEventListener('message', function (event) {
		switch (event.data.action) {
			case 'Open':
				open(event.data.image);
				break;
			case 'SetLocation':
				setLocation(event.data.location);
				break;
			case 'showOverlay':
				document
					.getElementById('camera-overlay')
					.classList.remove('hide');
				break;
			case 'hideOverlay':
				document.getElementById('camera-overlay').classList.add('hide');
				break;
		}
	});

	document.onkeydown = function (event) {
		if (event.repeat) {
			return;
		}
		switch (event.key) {
			case 'Escape':
				close();
				break;
		}
	};
});