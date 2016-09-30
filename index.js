'use strict'

const Program = require('commander');
const Info = require('./package');
const SSDPBrowser = require('ssdp-js');
const Browser = new SSDPBrowser();
const Render = require('./render');

Program
  .version(Info.version)
  .option('-u, --url [link]', 'input direct link to video', '')
  .parse(process.argv);

if (!Program.url) {
	Program.outputHelp();
	process.exit(0);
	return;
}

Browser.start();

Browser.onDevice(function(device) {
  console.log(`Discovered ${device.name}`);
	Render(device, Program.url);
	//Browser.destroy();
});
