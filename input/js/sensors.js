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
