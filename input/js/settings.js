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
