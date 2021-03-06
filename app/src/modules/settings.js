const LOAD_SETTINGS_STATE = "settings/LOAD_SETTINGS_STATE";
const SET_SETTINGS_STATE = "settings/SET_SETTINGS_STATE";

const initialState = {
  settings: {
    alarmMsgOn: true,
    alarmSoundOn: true,
  },
};

// localStorage에서 사용자 설정 불러오기
export const loadSettingsState = () => {
  const settings = window.localStorage.getItem("settings");

  return {
    type: LOAD_SETTINGS_STATE,
    payload: settings ? JSON.parse(settings) : initialState.settings,
  };
};

/**
 * localStorage에 사용자 설정 저장하기
 *
 * @param {Object} - alarmMsgOn {boolean} : 알람 메세지 설정 alarmSoundOn {boolean} : 경고음 설정
 */
export const setSettingsState = (settings) => {
  window.localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: SET_SETTINGS_STATE,
    payload: settings,
  };
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SETTINGS_STATE:
      return {
        settings: action.payload,
      };
    case SET_SETTINGS_STATE:
      return {
        settings: action.payload,
      };
    default:
      return state;
  }
}
