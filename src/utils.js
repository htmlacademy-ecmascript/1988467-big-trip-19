import dayjs from 'dayjs';
import { FilterType, FormatType } from './const';

function humanizePointDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(FormatType.DATE_FORMAT) : '';
}

function humanizePointTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(FormatType.TIME_FORMAT) : '';
}

function humanizePointDateAndTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(FormatType.DATE_TIME_FORMAT) : '';
}

function calculateDuration(dateFrom, dateTo) {
  const duration = dayjs(dateTo).diff(dateFrom, 'minute');
  let humanizeDuration = 0;
  if (duration < 60) {
    humanizeDuration = `${Math.floor(duration)}M`;
  } else if (duration >= 60 && duration < 1440) {
    humanizeDuration = `${Math.floor(duration / 60)}H ${duration % 60}M`;
  } else if (duration >= 1440) {
    humanizeDuration = `${Math.floor(duration / 1440)}D ${Math.floor((duration % 1440) / 60)}H ${duration % 60}M`;
  }
  return humanizeDuration;
}

function sortDayDesc(waypointA, waypointB) {
  const dateA = new Date(waypointA.dateFrom);
  const dateB = new Date(waypointB.dateFrom);
  return dateA - dateB;
}

function sortTimeDesc(waypointA, waypointB) {
  const durationA = new Date(waypointA.dateTo) - new Date(waypointA.dateFrom);
  const durationB = new Date(waypointB.dateTo) - new Date(waypointB.dateFrom);
  return durationB - durationA;
}

function sortPriceDesc(waypointA, waypointB) {
  return waypointB.basePrice - waypointA.basePrice;
}

function isDatesEqual(dateWaypoint, dateUpdate) {
  return dateWaypoint === dateUpdate ? true : (dateWaypoint === null && dateUpdate === null);
}

function isPriceEqual(priceWaypoint, priceUpdate) {
  return priceWaypoint === priceUpdate ? true : (priceWaypoint === null && priceUpdate === null);
}

function isDurationEqual(waypoint, update) {
  const durationWaypoint = new Date(waypoint.dateTo) - new Date(waypoint.dateFrom);
  const durationUpdate = new Date(update.dateTo) - new Date(update.dateFrom);
  return durationWaypoint === durationUpdate ? true : (durationWaypoint === null && durationUpdate === null);
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => !point.isArchive),
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.parse(point.dateFrom) > Date.now()),
  [FilterType.PRESENT]: (points) => points.filter((point) => Date.parse(point.dateFrom) <= Date.now() && Date.parse(point.dateTo) >= Date.now()),
  [FilterType.PAST]: (points) => points.filter((point) => Date.parse(point.dateTo) < Date.now())
};

export { humanizePointDueDate, humanizePointTime, calculateDuration, humanizePointDateAndTime, sortDayDesc, sortTimeDesc, sortPriceDesc, isDatesEqual, isPriceEqual, isDurationEqual, filter };
