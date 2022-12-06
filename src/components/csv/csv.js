import "./csv.css";
import PermMediaSharpIcon from "@mui/icons-material/PermMediaSharp";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

export const CSV = () => {
  let [option, setOption] = useState("csv-json");
  let [file, setFile] = useState();
  let [fileName, setFileName] = useState("");
  let API;

  const chooseFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  const chooseOption = (event) => {
    setOption(event.target.value);
  };

  const convertFile = async (event) => {
    event.preventDefault();
    API = `http://localhost:3500/${option}`;
    console.log(API, "apiiii");
    console.log(file, "optionnn");
    console.log(fileName, "fileName");
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(API, formData, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/json" })
        );

        window.open(url);
        // setFileName("");
      });
  };
  const removeFileName = () => {
    setFileName("");
    setOption("csv-json");
  };

  return (
    <div className="parent">
      <div className="childBox childBox-1">
        {fileName === "" ? (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="text/csv"
              type="file"
              name="file"
              onChange={chooseFile}
            />
            <div className="folderIcon">
              <PermMediaSharpIcon />
            </div>
          </IconButton>
        ) : null}

        <div>
          <span>{fileName}</span>
          {fileName !== "" ? (
            <CancelIcon
              className="crossIcon"
              onClick={removeFileName}
            ></CancelIcon>
          ) : null}
        </div>
        {fileName !== "" ? (
          <div className="btnSection">
            <select className="option" onChange={chooseOption}>
              <option value="csv-json">JSON</option>
              <option value="csv-pdf">PDF</option>
              <option value="csv-xml">XML</option>
              <option value="csv-yaml">YAML</option>
            </select>
            <button className="convertBtn" onClick={convertFile}>
              Convert
            </button>
          </div>
        ) : null}
      </div>
      <div className="childBox">
        <img src="/file_logo.jpg" alt="file logo" />
      </div>
    </div>
  );
};
