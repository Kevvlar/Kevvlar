export {
  signUserUp,
  signUserIn,
  sendNotification,
  getNotifications,
  handleLogOutUser,
  clearErrorMessage,
  turnOffNotify,
  getNotificationStatus,
  isReadServer,
} from "./user/userActions";

export {
  showLeftSideNav,
  hideLeftSideNav,
} from "./left-side-nav/leftSideNavActions";

export { toggleActivity } from "./activity/activityActions";
export {
  toggleFileModal,
  uploadFile,
  fetchFiles,
  deleteFile,
} from "./file/fileActions";

export {
  toggleRightSideNav,
  toggleFlatCard,
  toggleGridCard,
} from "./right-side-nav/rightSideNavActions";

export {
  closeModal,
  setBoardModal,
  setColumnModal,
  setCardModal,
  setUserModal,
} from "./modal/modalActions";

export {
  fetchBoards,
  fetchBoard,
  addNewBoardLocal,
  addMemberToBoard,
  changeColumnsOrderServer,
  createNewBoardServer,
  editCurrentBoardLocal,
  editBoardServer,
  handleDeleteBoardLocal,
  handleDeleteBoardServer,
  addColumnToColumnsOrderLocal,
  removeColumnFromColumnsOrderLocal,
  removeMemberFromBoard,
  changeColumnsOrderLocal,
  setCurrentBoardData,
  enterSearchText,
  clearBoards,
  getUserEmail,
} from "./board/boardActions";

export {
  createColumnServer,
  addNewCardLocal,
  addNewCardServer,
  editColumnLocal,
  editColumnServer,
  removeCardFromColumnsOrderServer,
  editCardLocal,
  editCardServer,
  deleteCardLocal,
  deleteColumnServer,
  deleteCardServer,
  handleDeleteColumnLocal,
  fetchColumns,
  fetchActivities,
  createActivity,
  handleAddNewColumnLocal,
  setCurrentCardData,
  changeCardsOrderLocal,
  changeCardsOderIo,
  handleChangeCardColumnIO,
  handleChangeCardColumnLocal,
  enterCardSearchKey,
  setCurrentColumnData,
  clearColumns,
} from "./column/columnActions";

export const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_LOCAL
    : process.env.REACT_APP_API_LIVE;
