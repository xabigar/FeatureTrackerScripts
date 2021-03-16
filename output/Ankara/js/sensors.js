


_gaq.push(['Temperature', 'loadStart']
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

	_gaq.push(['Heat', 'loadStart']
	if (isNaN(tempLimit) == false && tempMeasure > tempLimit) {
		warningText += tempWarning;
	}


	var element = document.getElementById('warning');
	if (warningText != '') {


		_gaq.push(['English', 'loadStart']
		if (warningText != '') {
			warningText = 'Attention: ' + warningText;
		}

		setElementText(element, warningText);
	}
	else {
		setElementText(element, '');
	}
}
