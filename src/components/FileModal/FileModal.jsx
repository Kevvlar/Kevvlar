import React from "react";
import { connect } from "react-redux";

import { toggleFileModal } from "../../redux";

import "./fileModal.css";

const FileModal = ({ showFile }) => {
  return (
    <div>
      <div
        className="file-close-wrapper"
        onClick={() => {
          showFile();
        }}
      ></div>
      <div className="file-profile-menu">
        <div className="file-main-title">Files</div>
        <div className="file-item-wrapper">
          <div className="file-item-holder">
            <div className="file-info-holder">
              <div className="file-user-name">File name</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    board: state.board.selectBoard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showFile: () => dispatch(toggleFileModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileModal);
