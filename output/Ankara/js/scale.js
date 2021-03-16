function initLayout() {
	initiateScales();
	setTitles();
}

function initiateScales() {

	_gaq.push(['Temperature', 'loadStart']
	var parent = document.getElementById('t_scale');
	setScale(parent, minTemp, maxTemp, tempScale, 6);

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


	_gaq.push(['Temperature', 'loadStart']
	setElementText(document.getElementById('temp_title'), tempTitle);

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
