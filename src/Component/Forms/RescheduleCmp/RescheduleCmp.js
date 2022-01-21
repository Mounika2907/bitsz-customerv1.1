import React from "react";
import Aux from "../../../hoc/Aux";
import { Text } from "../../../View/Language/Language";

const RescheduleCmp = (props) => {
  // console.log(props.waitingList?.token <= (props.waitingList?.tokenlimit ? props.waitingList?.tokenlimit : "1"));

  return (
    <Aux>
      <div className="row justify-content-center">
        <div className="col-md-5 p-0">
          <div className="instructions sr1">
            <div className="reschedule">
              {props.scheduleDetails?.time ? (
                <h6 className="text-center reschedule-title mb-1">
                  <Text tid="Schedule_Details" /> :{/* Schedule Details: */}
                  <span className="text-danger pl-1">
                    {props.scheduleDetails.sdate} ({props.scheduleDetails.time})
                  </span>
                </h6>
              ) : null}

              {props.waitingList?.isscheduled === "0" ? (
                props.waitingList?.token !== "0" &&
                props.waitingList?.token !== "-1" ? (
                  <h6 className="text-center">
                    <Text tid="please_wait" />
                  </h6>
                ) : null
              ) : props.waitingList?.isscheduled === "1" ? (
                <p
                  className="text-center text-danger small mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={props.cancelSchedule}
                >
                  {/* Cancel Schedule */}
                  <Text tid="Cancel_Schedule" />
                </p>
              ) : null}

              {/* {(props.waitingList?.token !== "0" && props.waitingList?.token !== "-1") ? <h6 className="text-center">
                                <Text tid="please_wait" />
                            </h6> : null} */}

              {/* {(props.waitingList?.isscheduled === "0") ? <h6 className="text-center">
                                <Text tid="please_wait" />
                            </h6> : <p className="text-center text-danger small mb-1" style={{ cursor: "pointer" }} onClick={props.cancelSchedule}>
                                    Cancel Schedule
                            </p>} */}

              {props.scheduleDetails?.joinstatus ? null : (
                <h6 className="text-center reschedule-title">
                  <Text tid="token" />
                  {props.waitingList?.token}
                </h6>
              )}

              <div className="reschedule-img">
                <img src="./assets/images/caller.svg" alt="no img" />
              </div>
              <input
                type="text"
                className="form-control custom-inp d-none"
                id="userName"
                value={props.myUserName}
                onChange={(e) => props.handleChangeUserName(e)}
                required
                readOnly
                placeholder="V-CIP Number"
              />
              <div className="text-center">
                {props.waitingList?.token === "0" ||
                props.scheduleDetails?.joinstatus === "1" ? (
                  <button
                    type="button"
                    className="custom-btn"
                    onClick={props.joinSession}
                  >
                    <Text tid="join" />
                  </button>
                ) : (
                  <button type="button" className="custom-btn" disabled>
                    <Text tid="join" />
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              {props.waitingList?.isscheduled === "1" ? (
                <button type="button" className="custom-btn" disabled>
                  {/* Change language */}
                  <Text tid="Change_language" />
                </button>
              ) : (
                <button
                  type="button"
                  className="custom-btn"
                  data-toggle="modal"
                  data-target="#info"
                >
                  {/* Change language */}
                  <Text tid="Change_language" />
                </button>
              )}
            </div>
            <p className="reschedule-note">
              <span className="text-danger">*</span>
              <Text tid="please_note" />
              {/* Changing your language for video call now, will delete the
                                existing token number and a new token number will be assigned. */}
              <Text tid="Schedule_note" />
            </p>
          </div>
        </div>
        <div className="col-md-5 p-0">
          {(props.waitingList?.token <=
            (props.waitingList?.tokenlimit
              ? props.waitingList?.tokenlimit
              : "1") ||
            props.waitingList?.token === "-1") &&
          (props.waitingList?.isscheduled === "1" ||
            props.waitingList?.isscheduled === "0" ||
            props.waitingList?.token === "0") ? (
            <div className="instructions sr1 border-right-0 block-disabled">
              <div className="reschedule">
                <h4 className="text-center reschedule-title">
                  {/* Reschedule */}
                  <Text tid="Reschedule" />
                </h4>
                <form className="reschedule-form">
                  <div className="form-group">
                    <label className="reschedule-label">
                      {/* Select new date for video call session */}
                      <Text tid="select_date" />
                    </label>
                    <input
                      type="date"
                      name="sdate"
                      className="form-control reschedule-inp"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="reschedule-label">
                      {/* Select available time slots */}
                      <Text tid="select_time" />
                    </label>
                    <div className="position-relative">
                      <span className="time">
                        <i className="far fa-clock"></i>
                      </span>
                      {/* <input type="text" className="form-control reschedule-inp" required /> */}
                      <select
                        defaultValue={"DEFAULT"}
                        name="stime"
                        className="form-control reschedule-inp"
                        required
                      >
                        <option value={"DEFAULT"}>00.00</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="text-center mt-3">
                <button type="button" className="custom-btn">
                  {/* Confirm */}
                  <Text tid="Confirm" />
                </button>
              </div>
              <p className="reschedule-note">
                <span className="text-danger">*</span>
                <Text tid="please_note" />
                {/* you can only reschedule the call once in 6 hours */}
                <Text tid="only_reschedule" />
              </p>
            </div>
          ) : (
            <div className="instructions sr1 border-right-0">
              <div className="reschedule">
                <h4 className="text-center reschedule-title">
                  {/* Reschedule */}
                  <Text tid="Reschedule" />
                </h4>
                <form className="reschedule-form" id="rescheduleForm">
                  <div className="form-group">
                    <label className="reschedule-label">
                      {/* Select new date for video call session */}
                      <Text tid="select_date" />
                    </label>
                    <input
                      type="date"
                      name="sdate"
                      //  min="2020-06-18" max="2020-06-20"
                      min={props.formateDate(props.calenderDetails.sfdate)}
                      max={props.formateDate(props.calenderDetails.stdate)}
                      onChange={props.handleChange}
                      className="form-control reschedule-inp"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="reschedule-label">
                      {/* Select available time slots */}
                      <Text tid="select_time" />
                    </label>
                    <div className="position-relative">
                      <span className="time">
                        <i className="far fa-clock"></i>
                      </span>
                      {/* <input type="text" className="form-control reschedule-inp" required /> */}
                      <select
                        defaultValue={"DEFAULT"}
                        name="stime"
                        onChange={props.handleChange}
                        className="form-control reschedule-inp"
                        required
                      >
                        <option value={"DEFAULT"} disabled>
                          Select Time
                        </option>
                        {props.calenderDetails
                          ? props.calenderDetails?.stimes?.map((res, index) => (
                              <option key={index}>{res}</option>
                            ))
                          : null}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={props.createSchedule}
                  className="custom-btn"
                >
                  {/* Confirm */}
                  <Text tid="Confirm" />
                </button>
              </div>
              <p className="reschedule-note">
                <span className="text-danger">*</span>
                <Text tid="please_note" />
                {/* you can only reschedule the call once in 6 hours */}
                <Text tid="only_reschedule" />
              </p>
            </div>
          )}
        </div>
      </div>

      <hr className="hr" />

      <div className="row justify-content-center">
        <div className="col-md">
          <div className="instructions sr1 border-right-0 p-0">
            <h5 className="instructions-title mb-1 pl-0">
              <Text tid="video_instruction" />
            </h5>
            <p className="text-danger small mb-3">
              <Text tid="video_please_note" />
            </p>
            <ul className="instructions-list pl-4">
              <li>
                <Text tid="video_ins1" />
              </li>
              <li>
                <Text tid="video_ins2" />
              </li>
              <li>
                <Text tid="video_ins3" />
              </li>
              <li>
                <Text tid="video_ins4" />
              </li>
              <li>
                <Text tid="video_ins5" />
              </li>
              <li>
                <Text tid="video_ins6" />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md">
          <div className="instructions sr1 border-right-0 p-0">
            <div className="">
              <img
                src="./assets/images/instructions.png"
                alt="no img"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="info"
        ref={props.inpRef}
        data-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-data text-center py-3">
                <h5 className="modal-data-content text-dark text-center">
                  {/* Please select the language for the video call */}
                  <Text tid="Please_select" />
                </h5>
                <div>
                  <form
                    className="reschedule-form"
                    onSubmit={props.submitLanguage}
                  >
                    <div className="form-group mx-auto">
                      <div className="position-relative">
                        <select
                          defaultValue={"DEFAULT"}
                          name="langid"
                          onChange={props.handleChange}
                          required
                          className="form-control reschedule-modalinp"
                        >
                          <option value={"DEFAULT"} disabled>
                            Select Language
                            {/* <Text tid="Select_Language" /> */}
                          </option>
                          {props.languagesList.length !== 0
                            ? props.languagesList.map((res, index) => (
                                <option value={res.langid} key={index}>
                                  {res.lang}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn custom-btn mt-3 ml-0 text-white">
                      <Text tid="Confirm" />
                      {/* Confirm */}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default RescheduleCmp;
