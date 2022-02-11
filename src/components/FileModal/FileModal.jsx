import React, { useState } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import axios from "axios";

import { toggleFileModal, uploadFile } from "../../redux";

import "./fileModal.css";

const FileModal = ({ showFile, createFile, user, board, loading, files }) => {
  const [fileData, setFileData] = useState();

  const formData = new FormData();

  const FileItem = ({ file }) => {
    return (
      <div className="file-item-container">
        <div className="file-user-name">{file.name}</div>
        <div className="file-button-container">
          <button
            type="button"
            onClick={() => {
              axios
                .get(file.url, {
                  responseType: "blob",
                })
                .then((response) => {
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");

                  link.href = url;

                  link.setAttribute("download", file.name);

                  document.body.appendChild(link);
                  link.click();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Download
          </button>
          <button className="file-delete-button">Delete</button>
        </div>
      </div>
    );
  };

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
          <div className="file-container">
            <div className="files-holder">
              {files.map((file) => (
                <FileItem key={file._id} file={file} />
              ))}
              {loading ? (
                <div
                  className="file-item-container"
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  <div className="file-user-name">{fileData.name}</div>
                  <div className="file-button-container">
                    <button className="file-download-button">download</button>
                    <button className="file-delete-button">delete</button>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <center>
                <input
                  type="file"
                  onChange={(e) => {
                    setFileData(e.target.files[0]);
                  }}
                />
                {!fileData ? null : (
                  <button
                    onClick={(e) => {
                      const now = Date.now();
                      formData.append("document", fileData);
                      formData.append("date", dateFormat(now, "mmm dS, yyyy"));
                      formData.append("time", dateFormat(now, "h:MM TT"));
                      createFile(user.token, board.id, formData);
                    }}
                  >
                    upload
                  </button>
                )}
              </center>
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
    loading: state.file.loading,
    files: state.file.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showFile: () => dispatch(toggleFileModal()),
    createFile: (token, boardId, fileData) =>
      dispatch(uploadFile(token, boardId, fileData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileModal);
