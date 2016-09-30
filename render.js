'use strict'

const MediaRenderer = require('upnp-rndr');

// Load a web stream
const options = {
	autoplay: true,
	contentType: 'video/mp4',
	metadata: {
		title: 'DLNA-Storm',
		type: 'video', // can be 'video', 'audio' or 'image'
		//subtitlesUrl: 'http://url.to/subtitles.srt',
		//protocolInfo : 'http-get:*:video/mp4:DLNA.ORG_PN=AVC_MP4_BL_CIF15_AAC_520;'
	}
};

function Render(device, url) {
	let client = new MediaRenderer(device.xml);

	client.load(url, options, function(err, result) {
		if (err) {
			console.log(err);
			//process.exit(0);
			return;
		}

		console.log(`Initializing media stream for ${device.name}..`);
	});

	/*client.on('status', function(status) {
		// Reports the full state of the AVTransport service
		console.log(`Received status for ${device.name}:`);
		console.log(status);
	});*/

	client.on('playing', function() {
		client.getPosition(function(err, position) {
			client.getDuration(function(err, duration) {
				console.log(`Playing at ${position}/${duration} on ${device.name}`);
			});
		});
	});

	client.on('paused', function() {
		client.getPosition(function(err, position) {
			console.log(`Paused at ${position} on ${device.name}`);
		});
	});

	client.on('stopped', function() {
		client.getPosition(function(err, position) {
			console.log(`Stopped at ${position} on ${device.name}`);
		});
	});

	client.on('speedChanged', function(speed) {
		console.log(`Seeking at speed ${speed} on ${device.name}`);
	});
}

module.exports = Render;
