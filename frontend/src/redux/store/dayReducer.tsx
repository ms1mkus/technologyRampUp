import * as actionTypes from "./dayActionTypes"

const initialState: DayState = {
  day: new Date(),
}

const reducer = (
    state: DayState = initialState,
    action: DayAction
  ): DayState => {
    switch (action.type) {
      case actionTypes.CHANGE_DAY:
        const newDay: Date = action.day;
        return {
            day: newDay
        }
    }
    return state
  }
  
  export default reducer