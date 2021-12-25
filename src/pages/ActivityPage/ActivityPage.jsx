import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import Modal from "../../components/modal/Modal";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";

import { getUpdate } from "../../redux";

import "./activityPage.css";

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchUpdates(this.props.user.token, this.props.boardId);

    // this.interval = setInterval(() => {
    //   if (this.props.showModal === false) {
    //     this.props.fetchUpdates(this.props.user.token, this.props.boardId);
    //     console.log("yes");
    //   } else {
    //     clearInterval(this.interval);
    //   }
    // }, 8000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return (
      <div className="todopage">
        <AppBar />
        <BoardNavBar />
        {this.props.rightSideNav ? <RightSideNav /> : null}
        <ColumnHolder />
        {this.props.showModal ? <Modal /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdates: (token, boardId) => dispatch(getUpdate(token, boardId)),
  };
};

const mapStateToProps = (state) => {
  return {
    boardId: state.board.selectBoard.id,
    user: state.user.userData,
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
    showModal: state.modal.showModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
