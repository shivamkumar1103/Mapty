import { Cycling, Running } from './helpers.js';

export const state = {
  workouts: [],
  lastClick: null,
  currentSort: 'date',
};

export const getLocation = function (success, errHandler) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, () => {
      errHandler(new Error("Couldn't get your location"));
    });
  } else {
    errHandler(new Error('Geo location is not supported by your browser'));
  }
};

export const setMapClick = function (mapE) {
  state.lastClick = mapE;
};

const validInput = function (...inputs) {
  return inputs.every(input => Number.isFinite(input));
};
const positiveInput = function (...inputs) {
  return inputs.every(input => input > 0);
};

const isValidWorkout = function ({
  type,
  duration,
  elevationGain,
  cadence,
  distance,
}) {
  if (type === 'cycling') {
    if (
      !validInput(distance, duration, elevationGain) ||
      !positiveInput(distance, duration)
    )
      throw new Error('Not a valid input');
    else return { type, duration, distance, elevationGain };
  } else if (type === 'running') {
    if (
      !validInput(distance, duration, cadence) ||
      !positiveInput(distance, duration, cadence)
    )
      throw new Error('Not a valid input');
    else return { type, duration, distance, cadence };
  }
};

export const newWorkout = function (data) {
  try {
    let workout;
    const { lat, lng } = state.lastClick.latlng;
    data = isValidWorkout(data);
    if (data.type === 'running') {
      // prettier-ignore
      workout = new Running( [lat,lng,],data.distance, data.duration, data.cadence);
    } else {
      // prettier-ignore
      workout = new Cycling([lat,lng,],data.distance, data.duration, data.elevationGain,);
    }
    state.workouts.push(workout);

    return workout;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteWorkout = function (id) {
  state.workouts = state.workouts.filter(
    workout => workout.id.toString() !== id.toString(),
  );
};

export const sortWorkouts = function () {
  console.log(this.state.workouts);
  if (this.state.currentSort === 'date') {
    this.state.workouts.sort((a, b) => a.id - b.id);
    console.log('sorted by date');
  } else if (this.state.currentSort === 'distance') {
    this.state.workouts.sort((a, b) => a.distance - b.distance);
    {
      console.log('sorted by distance');
    }
  } else this.state.workouts.sort((a, b) => a.duration - b.duration);
};

export const setLocalStorage = function () {
  localStorage.setItem('workouts', JSON.stringify(state.workouts));
};

export const getLocalStorage = function () {
  const workouts = JSON.parse(localStorage.getItem('workouts'));
  if (!workouts) return;
  state.workouts = workouts;
};
