class FormView {
  form = document.querySelector('form');
  inputType = document.querySelector('.form__input--type');
  inputDistance = document.querySelector('.form__input--distance');
  inputDuration = document.querySelector('.form__input--duration');
  inputCadence = document.querySelector('.form__input--cadence');
  inputElevation = document.querySelector('.form__input--elevation');

  constructor() {
    this._addHandlerType();
  }

  addHandlerSubmit(handler) {
    this.form.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getWorkoutDetails() {
    const type = this.inputType.value;
    const distance = +this.inputDistance.value;
    const duration = +this.inputDuration.value;
    const elevationGain = +this.inputElevation.value;
    const cadence = +this.inputCadence.value;

    return { type, duration, distance, cadence, elevationGain };
  }

  showForm() {
    this.form.classList.remove('hidden');
  }

  hideForm() {
    this.inputDistance.value =
      this.inputDuration.value =
      this.inputCadence.value =
      this.inputElevation.value =
        '';
    this.form.style.display = 'none';
    this.form.classList.add('hidden');
    setTimeout(() => (this.form.style.display = 'grid'), 1000);
  }

  _toggleElevation() {
    this.inputElevation
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
    this.inputCadence
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
  }

  _addHandlerType() {
    this.inputType.addEventListener('change', this._toggleElevation.bind(this));
  }
}

export default new FormView();
