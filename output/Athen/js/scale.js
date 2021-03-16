function initLayout() {
	initiateScales();
	setTitles();
}

function initiateScales() {

	_gaq.push(['Temperature', 'loadStart'] // created by script
	var parent = document.getElementById('t_scale');
	setScale(parent, minTemp, maxTemp, tempScale, 6);

	_gaq.push(['WindSpeed', 'loadStart'] // created by script
	var parent = document.getElementById('w_main');
	setScale(parent, minWind, maxWind, windScale, 14);
}

function setScale(parent, min, max, unit, partCount) {
	var dist = (max - min) / (partCount - 1);

	for (i = 0; i < parent.childNodes.length; i++) {
		var element = parent.childNodes[i];
		if (element.className != null && element.className != '' && element.className != null) {
			if ((number = element.className.match('text_(\\d+)'))) {
				setElementText(element, Math.round(min + number[1] * dist));
			}
			if (element.className == 'unit') {
				setElementText(element, unit);
			}
		}
	}
}

function setTitles() {
	setElementText(document.getElementById('main_title'), mainTitle);


	_gaq.push(['Temperature', 'loadStart'] // created by script
	setElementText(document.getElementById('temp_title'), tempTitle);

	_gaq.push(['WindSpeed', 'loadStart'] // created by script
	setElementText(document.getElementById('wind_title'), windTitle);
}

function setElementText(element, text) {
	var textNode = document.createTextNode(text);
	if (element.hasChildNodes()) {
		element.replaceChild(textNode, element.firstChild);
	}
	else {
		element.appendChild(textNode);
	}
}
