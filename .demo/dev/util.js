const timeDiff = (earlier, later) => {
  const DIFF_MS = (!earlier || !later) ? 0 : later - earlier
  return {
    day: Math.floor(DIFF_MS/1000/60/60/24),
    hour: Math.floor(DIFF_MS/1000/60/60%24),
    allHour: Math.floor(DIFF_MS/1000/60/60),
    minute: Math.floor(DIFF_MS/1000/60%60),
    second: Math.floor(DIFF_MS/1000%60),
    millisecond: Math.floor(DIFF_MS%1000),
  }
}
console.log(timeDiff(new Date(), new Date('2019-04-12 00:00:00')))
