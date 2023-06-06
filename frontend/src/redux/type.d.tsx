 type DayState = {
    day: Date
 }
  
type DayAction = {
    type: string
    day: Date
}
  
  type DispatchType = (args: DayAction) => DayAction