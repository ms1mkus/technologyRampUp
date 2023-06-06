import * as actionTypes from "./actionTypes"

export function changeDay(day: Date) {
  const action: DayAction = {
    type: actionTypes.CHANGE_DAY,
    day,
  }
  return action;
}
