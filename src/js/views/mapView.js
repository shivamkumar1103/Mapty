class MapView {
  map;
  _form = document.querySelector('.form');
  _clickHandler;

  addHandlerClick(handler) {
    this._clickHandler = handler;
  }

  loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    this.map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('click', mapE => {
      if (this._clickHandler) this._clickHandler(mapE);
    });
  }

  renderPopup(workout) {
    L.marker(workout.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.description}`)
      .openPopup();
  }

  moveToMarker(workout) {
    this.map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

export default new MapView();
