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
    const workout = model.newWorkout(data);
    // render workout maker
    mapView.renderPopup(workout);

    // sort workouts
    model.sortWorkouts();
    // render workout
    workoutView.clearWorkouts();
    workoutView.renderWorkouts(model.state.workouts);
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
  // sort workouts
  model.sortWorkouts();
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

function sortWorkout(sortInput) {
  if (model.state.currentSort === sortInput) return;
  console.log(sortInput);
  // update current sort
  model.state.currentSort = sortInput;
  // sort workouts
  model.sortWorkouts();
  // clear workouts
  workoutView.clearWorkouts();
  // render workouts
  workoutView.renderWorkouts(model.state.workouts);
}

const init = function () {
  controlMap();
  formView.addHandlerSubmit(controlSubmitForm);
  workoutView.addHandlerClick(controlMoveToMarker, controlDeleteWorkout);
  workoutView.addHandlerSort(sortWorkout);
};

init();
