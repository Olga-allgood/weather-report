const state = {
  currentTemperature: 50,
  resetCityButton: null,
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
  let temperatureColor = '';
  // get current temperature and set color based on temp
  // | Temperature (F) | Color  |
  // | --------------- | ------ |
  // | 80+             | Red    |
  // | 70-79           | Orange |
  // | 60-69           | Yellow |
  // | 50-59           | Green  |
  // | 49 or below     | Teal   |
  if (state.temperatureColor) {
    state.temperatureDisplay.classList.remove(state.temperatureColor);
  }

  if (state.currentTemperature >= 80) {
    state.temperatureColor = 'red';
  } else if (state.currentTemperature >= 70 && state.currentTemperature <= 79) {
    state.temperatureColor = 'orange';
  } else if (state.currentTemperature >= 60 && state.currentTemperature <= 69) {
    state.temperatureColor = 'yellow';
  } else if (state.currentTemperature >= 50 && state.currentTemperature <= 59) {
    state.temperatureColor = 'green';
  } else if (state.currentTemperature <= 49) {
    state.temperatureColor = 'teal';
  }

  state.temperatureDisplay.classList.add(state.temperatureColor);
};

const handleDecreaseTempButtonClick = () => {
  // change currentTemperature using decreaseTemp
  decreaseTemp();
  // change the class of the text
  changeColorBasedOnTemp();
  // update the text that's in the HTML
  updateDisplayTemp();
};

const handleIncreaseTempButtonClick = () => {
  // change currentTemperature using decreaseTemp
  increaseTemp();
  // update the text that's in the HTML
  updateDisplayTemp();
  // change the class of the text
  changeColorBasedOnTemp();
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
  updateCityNameField();
};

onLoaded();

