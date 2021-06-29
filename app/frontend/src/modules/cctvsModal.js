const CCTVS_MODAL_OPEN = "cctvsModal/CCTVS_MODAL_OPEN";
const CCTVS_MODAL_CLOSE = "cctvsModal/CCTVS_MODAL_CLOSE";
const CCTVS_MODAL_MAC_VALID = "cctvsModal/CCTVS_MODAL_MAC_VALID";

export const openModal = (trigger) => {
  const state = {
    isOpen: true,
    macValid: true,
    func: {
      createData: false,
      updateData: false,
      deleteData: false,
    },
  };
  state.func[trigger] = true;

  return { type: CCTVS_MODAL_OPEN, payload: state };
};
export const closeModal = () => {
  const state = {
    isOpen: false,
    macValid: true,
    func: {
      createData: false,
      updateData: false,
      deleteData: false,
    },
  };
  return { type: CCTVS_MODAL_CLOSE, payload: state };
};
export const setMacValid = (valid) => ({
  type: CCTVS_MODAL_MAC_VALID,
  payload: valid,
});

const initialState = {
  isOpen: false,
  macValid: true,
  func: {
    createData: false,
    updateData: false,
    deleteData: false,
  },
};
export default function cctvsModalReducer(state = initialState, action) {
  switch (action.type) {
    case CCTVS_MODAL_OPEN:
      return action.payload;
    case CCTVS_MODAL_CLOSE:
      return action.payload;
    case CCTVS_MODAL_MAC_VALID:
      return {
        ...state,
        macValid: action.payload,
      };
    default:
      return state;
  }
}
