const jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;
const fs = require('fs');

const dom = new JSDOM(
	`
	<!DOCTYPE html>
	<html>
	<head>
		<script src="node_modules/p5/lib/p5.js"></script>
		<script src="sketch.js"></script>
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

setTimeout(() => {
	const c = dom.window.document.body.getElementsByTagName('canvas')[0]
	if (c) {
		const data = c.toDataURL('image/png').replace('data:image/png;base64,', '');
		fs.writeFileSync('test.png', atob(decodeURIComponent(data)), 'binary');
		process.exit(0);
	} else {
		throw "no canvas element found!";
	}
}, 1500);
