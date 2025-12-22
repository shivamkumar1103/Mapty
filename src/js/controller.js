import * as model from './model.js';
import mapView from './views/mapView.js';
import formView from './views/formView.js';
import workoutView from './views/workoutView.js';

function controlMap() {
  try {
    model.getLocation(afterLoadMap, err => alert(err.message));
    mapView.addHandlerClick(controlMapClick);
  } catch (err) {
    alert(err);
  }
}

function afterLoadMap(position) {
  // load map
  mapView.loadMap(position);
  // load previous workouts
  controlSavedWorkouts();
}

function controlSubmitForm() {
  try {
    const data = formView.getWorkoutDetails();
    // store new workout
    model.newWorkout(data);
    // get currentWorkout
    const workout = model.state.workouts[model.state.workouts.length - 1];
    // render workout
    workoutView.renderWorkout(workout);
    // render workout maker
    mapView.renderPopup(workout);
    // hide form
    formView.hideForm();
    // update local Storage
    model.setLocalStorage();
  } catch (err) {
    console.log(err);
  }
}

function controlMoveToMarker(id) {
  const clickedWorkout = model.state.workouts.find(work => work.id == id);
  mapView.moveToMarker(clickedWorkout);
}

function controlMapClick(mapE) {
  // store coords of clicked location
  model.setMapClick(mapE);
  // show form
  formView.showForm();
}

function controlSavedWorkouts() {
  // get workouts
  model.getLocalStorage();
  // render workouts
  workoutView.renderWorkouts(model.state.workouts);
  mapView.renderPopups(model.state.workouts);
}

function controlDeleteWorkout(id) {
  // delete workout
  model.deleteWorkout(id);
  // remove workout <li>
  workoutView.removeWorkout(id);
  // remove popup
  mapView.removeMarker(id);
  // update local storage
  model.setLocalStorage();
}

const init = function () {
  controlMap();
  formView.addHandlerSubmit(controlSubmitForm);
  workoutView.addHandlerClick(controlMoveToMarker, controlDeleteWorkout);
};

init();
