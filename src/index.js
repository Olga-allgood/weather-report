const state = {
  currentTemperature: 50,
  currentLandscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  currentWeatherState: 4,
  temperatureDisplay: null,
  decreaseTempButton: null,
  increaseTempButton: null,
  temperatureColor: null,
  updatedCityName: null,
  cityNameDisplay: null,
};

const increaseTemp = () => {
  ++state.currentTemperature;
};

const decreaseTemp = () => {
  --state.currentTemperature;
};

const updateDisplayTemp = () => {
  // update the display
  state.temperatureDisplay.textContent = state.currentTemperature;
};

const changeColorBasedOnTemp = () => {
  // get current temperature and set color based on temp
  // | Temperature (F) | Color  |
  // | --------------- | ------ |
  // | 80+             | Red    |
  // | 70-79           | Orange |
  // | 60-69           | Yellow |
  // | 50-59           | Green  |
  // | 49 or below     | Teal   |
  const COLOR_STATES = {
    1: 'red',
    2: 'orange',
    3: 'yellow',
    4: 'green',
    5: 'teal'
  };
  if (state.temperatureColor) {
    state.temperatureDisplay.classList.remove(state.temperatureColor);
  }
  state.temperatureColor = COLOR_STATES[state.currentWeatherState];
  state.temperatureDisplay.classList.add(state.temperatureColor);
};

const changeLandscapeBasedOnTemp = () => {
  // | Temperature (F) | Landscape                         |
  // | --------------- | --------------------------------- |
  // | 80+             | `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`       |
  // | 70-79           | `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`      |
  // | 60-69           | `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`        |
  // | 59 or below     | `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"` |
  const LANDSCAPE_STATES = {
    1: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
    2: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
    3: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
    4: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
    5: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
  };
  state.landscapeDisplay.textContent = LANDSCAPE_STATES[state.currentWeatherState];

};

const setState = () => {
  if (state.currentTemperature >= 80) {
    state.currentWeatherState = 1;
  } else if (state.currentTemperature >= 70 && state.currentTemperature <= 79) {
    state.currentWeatherState = 2;
  } else if (state.currentTemperature >= 60 && state.currentTemperature <= 69) {
    state.currentWeatherState = 3;
  } else if (state.currentTemperature >= 50 && state.currentTemperature <= 59) {
    state.currentWeatherState = 4;
  } else if (state.currentTemperature <= 49) {
    state.currentWeatherState = 5;
  }
};

const handleDecreaseTempButtonClick = () => {
  // change currentTemperature using decreaseTemp
  decreaseTemp();
  updateDisplay();
};

const handleIncreaseTempButtonClick = () => {
  // change currentTemperature using decreaseTemp
  increaseTemp();
  updateDisplay();
};

const updateDisplay = () => {
  // update the text that's in the HTML
  updateDisplayTemp();
  // update the state
  setState();
  // change the class of the text
  changeColorBasedOnTemp();
  // change landscape
  changeLandscapeBasedOnTemp();
};

const updateCityNameField = () => {
  state.cityNameDisplay.textContent = state.updatedCityName.value;
}

const handleResetCityName = () => {
  state.updatedCityName.value = 'Seattle';
  updateCityNameField(); 
};


const registerEvents = () => {
  state.decreaseTempButton.addEventListener('click', handleDecreaseTempButtonClick);
  state.increaseTempButton.addEventListener('click', handleIncreaseTempButtonClick);
  state.updatedCityName.addEventListener('input', updateCityNameField);
  state.resetCityButton.addEventListener('click', handleResetCityName);

  // add event listener for the scroll event for infinite scroll feature
  // window.addEventListener('scroll', handlePageScrolled);
};



const loadControls = () => {
  state.temperatureDisplay = document.getElementById('tempValue');
  state.landscapeDisplay = document.getElementById('landscape');
  state.decreaseTempButton = document.getElementById('decreaseTempControl');
  state.increaseTempButton = document.getElementById('increaseTempControl');
  state.updatedCityName = document.getElementById('cityNameInput');
  state.cityNameDisplay = document.querySelector('h2');
  state.resetCityButton = document.getElementById('cityNameReset');

};

const onLoaded = () => {
  // steps to carry out when the page has loaded
  loadControls();
  registerEvents();
  updateDisplay();
};

onLoaded();

