
_gaq.push(['WindSpeed', 'loadStart'] // created by script
var windMeasure = 0;
function applyWindSpeed() {
	var measureText = document.getElementById("w_measure");
	windMeasure = measureText.value;
	var pointer = document.getElementById("w_point");

	applyTachoValue(minWind, maxWind, measureText, pointer);
	setWarnings();
	return false;
}

_gaq.push(['WindSpeed or AirPressure', 'loadStart'] // created by script
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

_gaq.push(['Temperature', 'loadStart'] // created by script
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

	_gaq.push(['Heat', 'loadStart'] // created by script
	if (isNaN(tempLimit) == false && tempMeasure > tempLimit) {
		warningText += tempWarning;
	}

	_gaq.push(['Gale', 'loadStart'] // created by script
	if (isNaN(windLimit) == false && windMeasure > windLimit) {
		warningText += (warningText == '') ? '' : ', ';
		warningText += windWarning;
	}

	var element = document.getElementById('warning');
	if (warningText != '') {


		_gaq.push(['English', 'loadStart'] // created by script
		if (warningText != '') {
			warningText = 'Attention: ' + warningText;
		}

		setElementText(element, warningText);
	}
	else {
		setElementText(element, '');
	}
}
