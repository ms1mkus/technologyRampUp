const setTimeToZero = (day: Date): void => {
  day.setUTCHours(0);
  day.setUTCMinutes(0);
  day.setUTCSeconds(0);
  day.setUTCMilliseconds(0);
};

export default setTimeToZero;
