const MS_IN_DAY = 86_400_400 /* ms */;
export const DEFAULT_TIMEBLOCK_HEIGHT = 70;
const DEFAULT_EVENT_COLUMN_GAP = 10;
const MAXIMUM_GROUPING_TIME_DIFFERENCE = 900000 /* ms */;

/**
 * Calculate the offset to the top of the itinerary view.
 * @param {{
 *  event: {startTimestamp: number; endTimestamp: number};
 *  startOfDayTimestamp: Number;
 *  span?: Number;
 *  colStart?: Number;
 *  timeblockHeight?: Number;
 *  colGap?: Number;
 * }} options
 * @returns {StyleValue} The top offset in absolute positioning.
 */
export function getEventPositionStyle({
  event,
  startOfDayTimestamp,
  span = 12,
  colStart = 0,
  timeblockHeight = DEFAULT_TIMEBLOCK_HEIGHT,
  colGap = DEFAULT_EVENT_COLUMN_GAP
}) {
  const fractionStart = (event.startTimestamp - startOfDayTimestamp) / MS_IN_DAY;
  const fractionEnd = (event.endTimestamp - startOfDayTimestamp) / MS_IN_DAY;
  const index = colStart / span;
  const numOfCols = 12 / span;
  const left = 100 / numOfCols * index;
  const heightValue = (fractionEnd - fractionStart) * timeblockHeight * 24;
  return {
    top: `${fractionStart * timeblockHeight * 24}px`,
    height: `${heightValue}px`,
    heightValue,
    left: left ? `calc(${100 / numOfCols * index}% + ${colGap / numOfCols * index}px)` : 0,
    width: span !== 12
      ? `calc(${100 / numOfCols}% - ${colGap * (numOfCols - 1) / numOfCols}px)`
      : "100%"
  };
}

/**
 * Sort event list and return the event groups by distance.
 * @param {{startTimestamp: number; endTimestamp: number}[]} eventList
 * @return {{startTimestamp: Number, events: {startTimestamp: number; endTimestamp: number}[]}}
 */
export function groupEvents(eventList) {
  const eventListAscending = eventList.sort((a, b) => a.startTimestamp - b.startTimestamp);

  const eventGroups = eventListAscending.reduce((prevEventGroups, curEvent, index) => {
    if (index == 0) {
      prevEventGroups.push({ startTimestamp: curEvent.startTimestamp, events: [curEvent] });
      return prevEventGroups;
    }
    const foundIndex = prevEventGroups.findIndex((v) => {
      return calculateOffset(v.startTimestamp, curEvent.startTimestamp) < MAXIMUM_GROUPING_TIME_DIFFERENCE;
    });

    if (foundIndex == -1) {
      prevEventGroups.push({ startTimestamp: curEvent.startTimestamp, events: [curEvent] })
      return prevEventGroups;
    }
    prevEventGroups[foundIndex].events.push(curEvent);
    return prevEventGroups;
  }, []);

  return eventGroups;
}

/**
 *
 * @param {Number} eventAStart
 * @param {Number} eventBStart
 * @returns offset
 */
export function calculateOffset(eventAStart, eventBStart) {
  return (eventAStart < eventBStart)
    ? eventBStart - eventAStart
    : eventAStart - eventBStart;
};

/**
 *
 * @param {{startTimestamp: Number, events: {startTimestamp: number; endTimestamp: number}[]}} eventGroup
 * @returns {Number}
 */
export function calculateEndOfEventGroup(eventGroup) {
  return eventGroup.events.reduce((p, c) => Math.min(p, c.endTimestamp), eventGroup.events[0].endTimestamp);
}

/**
 * @param {{startTimestamp: number, endTimestamp: number}} eventA
 * @param {{startTimestamp: number, endTimestamp: number}} eventB
 * @returns {Boolean} If event blocks are overlapping
 */
export function areEventsOverlapping(eventA, eventB) {
  if (eventB.startTimestamp < eventA.startTimestamp) {
    return eventA.startTimestamp <= eventB.endTimestamp;
  }
  return eventB.startTimestamp <= eventA.endTimestamp;
}
