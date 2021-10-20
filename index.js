const jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;
const fs = require('fs');

let framecounter = 0;
const numberOfFrames = 5;
const frameInterval = 1000;

const sketchfile = 'sketch.js';


fs.mkdirSync('output', {recursive: true}); // recursive also suppresses error if already existing.

const dom = new JSDOM(
	`
	<!DOCTYPE html>
	<html>
	<head>
		<script src="node_modules/p5/lib/p5.js"></script>
		<script src="${sketchfile}"></script>
	</head>
	<body>
	</body>
	</html>`,
	{
		url: 'file://'+__dirname+'/index.html',
		runScripts: "dangerously",
		resources: "usable",
		pretendToBeVisual: true,
	}
);

setInterval(() => {
	const c = dom.window.document.body.getElementsByTagName('canvas')[0]
	if (c) {
		const data = c.toDataURL('image/png').replace('data:image/png;base64,', '');
		const filename = `output/${(new Date()).getTime()}.png`;
		fs.writeFileSync(filename, atob(decodeURIComponent(data)), 'binary');
		console.info(`wrote ${filename}`);
		if (++framecounter >= numberOfFrames) {
			process.exit(0);
		}
	} else {
		throw "no canvas element found!";
	}
}, frameInterval);
