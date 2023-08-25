import React from "react";
import { Audio } from "react-loader-spinner";

export const LoadingDialog = ({ loading }) => {
  return (
    <div
      className={`modal fade ${loading ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{
        display: loading ? "flex" : "none",
        justifyContent: "center", 
        alignItems: "center", 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "100px" }}
            >
              <Audio type="ThreeDots" color="green" height={100} width={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
