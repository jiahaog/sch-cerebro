export const CHANGE_TIME = 'CHANGE_TIME';
export const STEP_TIME_FORWARD = 'STEP_TIME_FORWARD';
export const STEP_TIME_BACKWARD = 'STEP_TIME_BACKWARD';
export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK';

export function changeTime(newTime) {
  return {
    type: CHANGE_TIME,
    payload: newTime
  }
}

export function stepTimeForward() {
  return {
    type: STEP_TIME_FORWARD
  }
}

export function stepTimeBackward() {
  return {
    type: STEP_TIME_BACKWARD
  }
}

export function togglePlayback() {
  return {
    type: TOGGLE_PLAYBACK
  }
}
