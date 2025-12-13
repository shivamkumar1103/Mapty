import * as model from './model.js';
import mapView from './views/mapView.js';
import formView from './views/formView.js';
import workoutView from './views/workoutView.js';

function controlMap() {
  try {
    model.getLocation(mapView.loadMap.bind(mapView), err => alert(err.message));
    mapView.addHandlerClick(controlMapClick);
  } catch (err) {
    alert(err);
  }
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
  } catch (err) {
    console.log(err);
  }
}

function controlMoveToMarker(id) {
  const clickedWorkout = model.state.workouts.find(work => work.id == id);
  mapView.moveToMarker(clickedWorkout);
}

function controlMapClick(mapE) {
  model.setMapClick(mapE);
  formView.showForm();
}

const init = function () {
  controlMap();
  formView.addHandlerSubmit(controlSubmitForm);
  workoutView.addHandlerClick(controlMoveToMarker);
};

init();
