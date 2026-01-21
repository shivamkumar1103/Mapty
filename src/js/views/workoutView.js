class workoutView {
  _html;
  form = document.querySelector('.form');
  workouts = document.querySelector('.workouts');
  sortBtn = document.querySelector('.sort__btn');
  sortInput = document.querySelector('.sort__input');

  clearWorkouts() {
    this.workouts.innerHTML = '';
  }

  addHandlerSort(handler) {
    this.sortBtn.addEventListener('click', () => {
      handler(this.sortInput.value);
    });
  }

  renderWorkout(workout) {
    this._genratePreview(workout);
    this.workouts.insertAdjacentHTML('afterbegin', this._html);
  }

  renderWorkouts(workouts) {
    workouts.forEach(workout => {
      this.renderWorkout(workout);
    });
  }

  addHandlerClick(mapHandler, deleteHandler) {
    this.workouts.addEventListener('click', e => {
      const workoutEl = e.target.closest('.workout');
      if (!workoutEl) return;

      const id = workoutEl.dataset.id;

      if (e.target.classList.contains('workout__delete')) {
        // Delete from state
        deleteHandler(id);
        // Remove only the clicked workout from DOM
        workoutEl.remove();
      } else {
        // Move to marker
        mapHandler(id);
      }
    });
  }

  _genratePreview(workout) {
    this._html = `
        <li class="workout workout--running" data-id="${workout.id}">
            <div class="workout__header">
            <h2 class="workout__title">${workout.description}</h2>
            <span class="workout__delete">&times;</span>
          </div>
            <div class="workout__details">
                <span class="workout__icon">${
                  workout.type === 'running' ? '🏃‍♂️' : '🚴'
                }</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>`;
    if (workout.type === 'running') {
      this._html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
        </li>`;
    } else {
      this._html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
  }

  removeWorkout(id) {
    const el = this.workouts.querySelector(`[data-id="${id}"]`);
    if (el) el.remove();
  }
}

export default new workoutView();
