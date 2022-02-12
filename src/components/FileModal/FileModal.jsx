import React, { useState } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import axios from "axios";

import { toggleFileModal, uploadFile, deleteFile } from "../../redux";

import { DownloadIcon, DeleteIcon } from "../../assets/svg/iconlibrary";

import "./fileModal.css";

const FileModal = ({
  showFile,
  createFile,
  user,
  board,
  loading,
  files,
  removeFile,
}) => {
  const [fileData, setFileData] = useState();

  const formData = new FormData();

  const isFound = board.admins.some((admin) =>
    admin._id === user._id ? true : false
  );

  const FileItem = ({ file }) => {
    return (
      <div className="file-item-container">
        <div className="file-user-name">{file.name}</div>
        <div className="file-button-container">
          <button
            type="button"
            className="file-download-button"
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
            <DownloadIcon />
          </button>
          {isFound || user._id === file.owner ? (
            <button
              className="file-delete-button"
              onClick={() => {
                removeFile(user.token, board.id, file._id, file.publicId);
              }}
            >
              <DeleteIcon />
            </button>
          ) : null}
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
                    backgroundColor: "#333d46",
                  }}
                >
                  <div className="file-user-name">{fileData.name} in progress</div>
                </div>
              ) : null}
            </div>
            <div className="file-button-holder">
              <center className="file-input-holder">
                <input
                  type="file"
                  id="fileUpload"
                  className="file-input"
                  onChange={(e) => {
                    setFileData(e.target.files[0]);
                  }}
                />
                {!fileData ? null : (
                  <button
                    onClick={(e) => {
                      document.getElementById("fileUpload").value = "";
                      const now = Date.now();
                      formData.append("document", fileData);
                      formData.append("date", dateFormat(now, "mmm dS, yyyy"));
                      formData.append("time", dateFormat(now, "h:MM TT"));
                      createFile(user.token, board.id, formData);
                    }}
                    className="upload-file-button"
                  >
                    Upload
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
    removeFile: (token, boardId, fileId, publicId) =>
      dispatch(deleteFile(token, boardId, fileId, publicId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileModal);
