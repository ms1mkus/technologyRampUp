import * as actionTypes from "./dayActionTypes"

export function changeDay(day: Date) {
  const action: DayAction = {
    type: actionTypes.CHANGE_DAY,
    day,
  }
  return action;
}
