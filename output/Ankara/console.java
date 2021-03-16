/Users/xabiergarmendia/Documents/workspace/Weather Station Example2/input/js/scale.js
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

/Users/xabiergarmendia/Documents/workspace/Weather Station Example2/input/js/sensors.js
// PVSCL:IFCOND(AirPressure, LINE)
function applyPressure() {
	var measureText = document.getElementById("p_measure");
	var pointer = document.getElementById("p_point");

	applyTachoValue(minPres, maxPres, measureText, pointer);
	return false;
}
// PVSCL:ENDCOND

// PVSCL:IFCOND(WindSpeed, LINE)
var windMeasure = 0;
function applyWindSpeed() {
	var measureText = document.getElementById("w_measure");
	windMeasure = measureText.value;
	var pointer = document.getElementById("w_point");

	applyTachoValue(minWind, maxWind, measureText, pointer);
	setWarnings();
	return false;
}
// PVSCL:ENDCOND

// PVSCL:IFCOND(WindSpeed or AirPressure, LINE)
function applyTachoValue(min, max, measureText, pointer) {
	var divisor = Math.round((max - min) / 13);
	var c = Math.round(divisor / 2);

	if (measureText && pointer) {
		var measure = measureText.value;
		var intValue = checkMeasure(min, max, measure);
		if (isNaN(intValue)) {
			return false;
	  }

		intValue -= min;
		if (intValue % divisor < c) {
			intValue -= intValue % divisor;
		}
		else {
			intValue += divisor - intValue % divisor;
		}

		intValue /= divisor;
		pointer.style.background = "url('images/n_" + intValue + ".png')";
	}
	return false;
}
// PVSCL:ENDCOND

// PVSCL:IFCOND(Temperature, LINE)
var tempMeasure = 0;
function applyTemperature() {
	var min = minTemp;
	var max = maxTemp;

	var pxRange = 170;

	var measureText = document.getElementById("t_measure");
	var pointer = document.getElementById("t_point");

	if (measureText && pointer) {
		tempMeasure = measureText.value;
		var intValue = checkMeasure(min, max, tempMeasure);
		if (isNaN(intValue)) {
			return false;
		}
		intValue = (intValue - min) * (pxRange / (max - min));

		pointer.style.height = (177 - intValue) + "px";
	}
	setWarnings();
	return false;
}
// PVSCL:ENDCOND

function checkMeasure(min, max, measure) {
	if (measure == "" || measure == null) {
		return NaN;
	}
	if (isNaN(parseInt(measure)) || parseInt(measure) < min || parseInt(measure) > max) {
		alert("Bitte eine Zahl zwischen " + min + " und " + max + " eingeben!");
		return NaN;
	}
	return parseInt(measure);
}

function setWarnings() {
	warningText = '';

	// PVSCL:IFCOND(Heat, LINE)
	if (isNaN(tempLimit) == false && tempMeasure > tempLimit) {
		warningText += tempWarning;
	}
	// PVSCL:ENDCOND

	// PVSCL:IFCOND(Gale, LINE)
	if (isNaN(windLimit) == false && windMeasure > windLimit) {
		warningText += (warningText == '') ? '' : ', ';
		warningText += windWarning;
	}
	// PVSCL:ENDCOND

	var element = document.getElementById('warning');
	if (warningText != '') {

		// PVSCL:IFCOND(German, LINE)
		warningText = 'Achtung: ' + warningText;
		// PVSCL:ENDCOND

		// PVSCL:IFCOND(English, LINE)
		if (warningText != '') {
			warningText = 'Attention: ' + warningText;
		}
		// PVSCL:ENDCOND

		setElementText(element, warningText);
	}
	else {
		setElementText(element, '');
	}
}

/Users/xabiergarmendia/Documents/workspace/Weather Station Example2/input/js/settings.js
// PVSCL:IFCOND(Temperature, LINE)
var minTemp = -40;
var maxTemp = 60;
var tempScale = '°C';
// PVSCL:ENDCOND
// PVSCL:IFCOND(Heat, LINE)
var tempLimit = 45;
// PVSCL:ENDCOND

// PVSCL:IFCOND(AirPressure, LINE)
var minPres = 910;
var maxPres = 1040;
var presScale = 'hPa';
// PVSCL:ENDCOND

// PVSCL:IFCOND(WindSpeed, LINE)
var minWind = 0;
var maxWind = 130;
var windScale = 'km/h';
// PVSCL:ENDCOND
// PVSCL:IFCOND(Gale, LINE)
var windLimit = 80;
// PVSCL:ENDCOND

// PVSCL:IFCOND(English, LINE)
var mainTitle = 'Weather Station';
var tempTitle = 'Temperature';
var presTitle = 'Air Pressure';
var tempWarning = 'Extrem Heat';
var windTitle = 'Wind Speed';
var windWarning = 'Storm Warning';
// PVSCL:ENDCOND
// PVSCL:IFCOND(German, LINE)
var mainTitle = 'Wetterstation';
var tempTitle = 'Temperatur';
var presTitle = 'Luftdruck';
var tempWarning = 'Extreme Hitze';
var windTitle = 'Windgeschwindigkeit';
var windWarning = 'Sturmwarnung';
// PVSCL:ENDCOND

