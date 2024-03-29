import TripPresenter from './presenters/main-presenter.js';
import PointsModel from './models/model.js';
import FilterModel from './models/filter-model.js';
import WaypointApiService from './waypoint-api-service.js';

const AUTHORIZATION = 'Basic hskdufgh7sdfgjhksf';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const waypointsApiService = new WaypointApiService(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel({ waypointsApiService, onNewPointDestroy: handleNewPointDisabled });
const filtersModel = new FilterModel();

const tripPresenter = new TripPresenter({
  headerContainer: tripControlsFilters,
  mainContainer: tripEvents,
  model: pointsModel,
  filterModel: filtersModel,
  onNewPointDestroy: handleNewPointFormClose,
});

function handleNewPointButtonClick() {
  tripPresenter.createNewPoint();
  handleNewPointDisabled();
}

function handleNewPointDisabled() {
  newEventButton.disabled = true;
}

function handleNewPointFormClose() {
  newEventButton.disabled = false;
}

newEventButton.addEventListener('click', handleNewPointButtonClick);

tripPresenter.init();
pointsModel.init();
