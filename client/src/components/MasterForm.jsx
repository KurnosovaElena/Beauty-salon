import React from "react";
// import "./applyMaster.css";
import { CompInput } from "./CompInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { OrButton } from "./OrButton";

export function MasterForm({handleSubmit , headerMain, initivalValues}) {
    
    return (
        <>
            <div className="apply-form-div">
          <h1>{headerMain}</h1>
          <hr />
          <h2>Личная информация</h2>
          <div className="personal-data">
            <form
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <CompInput
                spanText="First Name"
                labelText="First Name"
                name="firstName"
                color="#590B11"
              ></CompInput>
              <CompInput
                spanText="Last Name"
                labelText="Last Name"
                name="lastName"
                color="#590B11"
              ></CompInput>
              <CompInput
                spanText="Phone Number"
                labelText="Phone Number"
                name="phoneNumber"
                color="#590B11"
              ></CompInput>
              <CompInput
                spanText="Website"
                labelText="Website"
                name="website"
                color="#590B11"
              ></CompInput>
              <CompInput
                spanText="Address"
                labelText="Address"
                name="address"
                color="#590B11"
              ></CompInput>
            </form>
          </div>
          <div className="prof-data">
            <hr />
            <h2>Общая информация</h2>
            <form
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <CompInput
                spanText="Specialization"
                labelText="Specialization"
                name="specialization"
                color="#590B11"
              ></CompInput>
              <CompInput
                spanText="Experience"
                labelText="Experience"
                type="number"
                name="experience"
                color="#590B11"
              ></CompInput>
              <CompInput
                spanText="Fee Per Procedure"
                labelText="Fee Per Procedure"
                type="number"
                name="feePerProcedure"
                color="#590B11"
              ></CompInput>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div
                  className="timing"
                  style={{
                    display: "flex",
                    flexDirection: "сolumn",
                  }}
                >
                  <span style={{color: "#590B11"}}>Timing</span>
                  <SingleInputTimeRangeField label="From - To" name="timings" />
                </div>
              </LocalizationProvider>
            </form>
          </div>
          <div className="submit-button">
            <OrButton
              color="rgba(89, 11, 17, 0.59)"
              text="подтвердить"
              className="primary-button"
              width="fit-content"
              type="submit"
              onClick={handleSubmit}
              initivalValues = {initivalValues}
            ></OrButton>
          </div>
        </div>
        </>
    )
}
