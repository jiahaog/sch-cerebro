export const CHANGE_TIME = 'CHANGE_TIME';

export function changeTime(newTime) {
  return {
    type: CHANGE_TIME,
    payload: newTime
  }
}
