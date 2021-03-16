function initLayout() {
	initiateScales();
	setTitles();
}

function initiateScales() {
	// PVSCL:IFCOND(AirPressure, LINE)
	var parent = document.getElementById('p_main');
	setScale(parent, minPres, maxPres, presScale, 14);
	// PVSCL:ENDCOND

	// PVSCL:IFCOND(Temperature, LINE)
	var parent = document.getElementById('t_scale');
	setScale(parent, minTemp, maxTemp, tempScale, 6);
	// PVSCL:ENDCOND

	// PVSCL:IFCOND(WindSpeed, LINE)
	var parent = document.getElementById('w_main');
	setScale(parent, minWind, maxWind, windScale, 14);
	// PVSCL:ENDCOND
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

	// PVSCL:IFCOND(AirPressure, LINE)
	setElementText(document.getElementById('pres_title'), presTitle);
	// PVSCL:ENDCOND

	// PVSCL:IFCOND(Temperature, LINE)
	setElementText(document.getElementById('temp_title'), tempTitle);
	// PVSCL:ENDCOND

	// PVSCL:IFCOND(WindSpeed, LINE)
	setElementText(document.getElementById('wind_title'), windTitle);
	// PVSCL:ENDCOND
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
