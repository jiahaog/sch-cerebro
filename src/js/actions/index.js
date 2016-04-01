export const CHANGE_TIME = 'CHANGE_TIME';
export const STEP_TIME = 'STEP_TIME';
export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK';

export function changeTime(newTime) {
  return {
    type: CHANGE_TIME,
    payload: newTime
  }
}

export function stepTime() {
  return {
    type: STEP_TIME
  }
}

export function togglePlayback() {
  return {
    type: TOGGLE_PLAYBACK
  }
}
