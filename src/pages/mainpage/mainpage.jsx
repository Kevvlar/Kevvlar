import React from "react";
import { useSelector } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import LeftSideNav from "../../components/sidenav-left/SideNavLeft";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
// import Modal from "../../components/modal/modal.component";

import "./mainPage.css";

// constructor() {
//   super();
//   this.state = {
//     showModal: false,
//     actionType: "card",
//     isGrid: true,
//     boardId: "",
//   };
// }

function MainPage() {
  const isLeftSideNav = useSelector((state) => state.sideNavLeft.leftSideNav);
  const isRightSideNav = useSelector(
    (state) => state.sideNavRight.rightSideNav
  );
  return (
    <div className="todopage">
      <AppBar />
      {isLeftSideNav ? <LeftSideNav /> : null}
      {isRightSideNav ? <RightSideNav /> : null}
      <ColumnHolder />
    </div>
  );
}

// 1
// {
//   this?.state?.showModal ? (
//     <Modal
//       hideModal={handleHideModal}
//       actionType={this?.state?.actionType}
//       showLeftSideNav={this.handleShowLeftSideNav}
//       forceShowLeftSideNav={this.forceShowLeftSideNav}
//       getBoardId={handleGetBoardId}
//     />
//   ) : null;
// }

// 4
// <ColumnHolder
//         setCardActionType={handleSetCardActionType}
//         createColumnActionType={handleCreateColumnActionType}
//         editColumnActionType={handleEditColumnActionType}
//         deleteModalActionType={handleDeleteModalActionType}
//         showModal={handleShowModal}
//         isGrid={this?.state?.isGrid}
//       />

// 5
// <LeftSideNav
//           setBoardId={handleSetBoardId}
//           createBoardActionType={handleCreateBoardActionType}
//           editBoardActionType={handleEditBoardActionType}
//           deleteModalActionType={handleDeleteModalActionType}
//           showModal={handleShowModal}
//         />

// const handleSetBoardId = (id) => {
//   this.setState({ boardId: id });
// };

// const handleGetBoardId = () => this.state.boardId;

// const handleShowModal = () => {
//   this.setState({ showModal: true });
// };

// const handleHideModal = () => {
//   this.setState({ showModal: false });
// };

// // Handling creating and editing actions of  modals
// const handleCreateBoardActionType = () => {
//   this.setState({ actionType: "CREATE_BOARD" });
// };

// const handleEditBoardActionType = () => {
//   this.setState({ actionType: "EDIT_BOARD" });
// };

// const handleDeleteModalActionType = () => {
//   this.setState({ actionType: "DELETE" });
// };

// const handleSetCardActionType = () => {
//   this.setState({ actionType: "card" });
// };

// const handleCreateColumnActionType = () => {
//   this.setState({ actionType: "CREATE_COLUMN" });
// };

// const handleEditColumnActionType = () => {
//   this.setState({ actionType: "EDIT_COLUMN" });
// };

export default MainPage;
