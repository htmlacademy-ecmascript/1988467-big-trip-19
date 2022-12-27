import FiltersView from './view/filters.js';
import SortsView from './view/sorts.js';
import EventsView from './view/event-list.js';
import WaypointView from './view/waypoint.js';
import EditFormView from './view/edit-form.js';
import EventView from './view/event.js';
import { render } from './render.js';
import PointsModel from './model.js';
import { offersByType } from './mock/mock-data.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #model = null;

  #waypoints = [];

  #eventList = new EventsView();
  #eventItem = new EventView();

  constructor({ headerContainer, mainContainer, model }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#model = model;
  }

  init() {
    this.#waypoints = [...this.#model.points];

    render(new FiltersView(), this.#headerContainer);
    render(new SortsView(), this.#mainContainer);
    render(this.#eventList, this.#mainContainer);
    render(this.#eventItem, this.#eventList.element);

    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#renderPoint(offersByType, this.#waypoints[i]);
    }
  }

  #renderPoint(offers, waypoint) {
    const pointListItem = new WaypointView({ offers, waypoint });
    const pointEditItem = new EditFormView({});

    const replaceWaypointToEdit = () => {
      this.#eventItem.element.replaceChild(pointEditItem.element, pointListItem.element);
    };

    const replaceEditToWaypoint = () => {
      this.#eventItem.element.replaceChild(pointListItem.element, pointEditItem.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointListItem.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceWaypointToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    // pointEditItem.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
    //   evt.preventDefault();
    //   replaceEditToWaypoint();
    //   document.removeEventListener('keydown', escKeyDownHandler);
    // });

    pointEditItem.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToWaypoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointListItem, this.#eventItem.element);
  }
}

const tripPresenter = new TripPresenter({
  headerContainer: tripControlsFilters,
  mainContainer: tripEvents,
  model: pointsModel,
});

tripPresenter.init();
