// ==UserScript==
// @name         CrOS Updates Scraper
// @namespace    https://sys32.dev/
// @version      1.0
// @match        https://cros-updates-serving.appspot.com/
// @run-at       document-start
// ==/UserScript==

const module = {};
// from consts.js:

'use strict';

module.exports = {"keys":[0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,19,23,25,17,20,22,30,16,31,21],"boards":["hatch","x86-mario","lumpy","stumpy","daisy","parrot","stout","link","butterfly","peppy","spring","wolf","leon","panther","pit","monroe","skate","clapper","squawks","glimmer","enguarde","expresso","zako","mccloud","quawks","gnawty","kip","swanky","big","tricky","winky","blaze","paine","candy","samus","banjo","jaq","mighty","yuna","jerry","speedy","rikku","tidus","minnie","kitty","guado","lulu","ninja","sumo","orco","gandof","mickey","heli","cyan","celes","terra","ultima","edgar","buddy","chell","sentry","lars","setzer","reks","relm","wizpig","banon","elm","cave","kefka","asuka","kevin","tiger","fievel","hana","pyro","snappy","caroline","reef","bob","sand","eve","coral","fizz","soraka","nautilus","vayne","pantheon","nami","nocturne","grunt","bobba","bobba360","octopus","liara","rammus","scarlet","leona","sarien","shyvana","kukui","jacuzzi","atlas","dedede","drallion","kalista","puff","trogdor","zork","asurada","volteer","strongbad"],"versions":{"32":["4920.83.0"],"33":["5116.88.0"],"34":["5500.130.0"],"35":["5712.88.0"],"36":["5841.83.0","5841.90.0"],"48":["7647.84.0"],"51":["8172.62.0"],"52":["8350.68.0"],"53":["8530.81.0"],"56":["9000.91.0"],"57":["9202.64.0"],"58":["9334.72.0"],"59":["9460.60.0"],"60":["9592.96.0"],"61":["9765.85.0"],"62":["9901.77.0"],"65":["10323.62.0"],"66":["10452.99.0"],"67":["10575.58.0"],"68":["10895.56.0"],"69":["10895.78.0"],"70":["11021.81.0"],"71":["11151.113.0"],"72":["11316.165.0"],"73":["11647.104.0"],"74":["11895.118.0"],"75":["12105.100.0"],"76":["12239.67.0"],"77":["12371.75.0"],"78":["12499.66.0"],"79":["12607.82.0","12607.81.0"],"80":["12739.111.0","12739.94.0","12739.105.0"],"81":["12871.102.0"],"83":["13020.87.0","13020.82.0"],"84":["13099.110.0","13099.102.0"],"85":["13310.93.0"],"86":["13421.99.0"],"87":["13505.73.0","13505.111.0"],"88":["13597.105.0"],"89":["13729.56.0"],"90":["13816.82.0","13816.64.0"],"91":["13904.55.0","13904.97.0"],"92":["13982.88.0"],"93":["14092.77.0"],"94":["14150.87.0","14150.64.0","14150.74.0"],"96":["14268.67.0"]}};

const consts = module.exports;

for(let [ release, version ] of Object.entries(consts.versions))consts.versions[release] = [].concat(version);

for(let node of document.querySelectorAll('a')){
	const release = parseInt(node.textContent);
	
	if(isNaN(release))continue;
	
	let [ match, version, board, firmware ] = node.href.match(/chromeos_([\d.]+)_(\w+)_recovery_stable-channel_mp(?:-v(\d+))?\.bin\.zip$/) || [];
	
	if(!match)continue;
	
	firmware = parseInt(firmware);
	
	if(!isNaN(firmware)){
		if(!consts.keys.includes(firmware))consts.keys.push(firmware);
	}
	
	if(!consts.boards.includes(board))consts.boards.push(board);
	
	if(consts.versions[release]){
		if(consts.versions[release].includes(version))continue;
		
		consts.versions[release].push(version);
	}else consts.versions[release] = [ version ];
}

const url = URL.createObjectURL(new Blob([ `'use strict';\n\nmodule.exports = ${JSON.stringify(consts)};` ], { type: 'application/javascript' }));

window.open(url);
