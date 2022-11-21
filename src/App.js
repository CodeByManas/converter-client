import axios from "axios";
import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import PermMediaSharpIcon from "@mui/icons-material/PermMediaSharp";

function App() {
  let [file, setFile] = useState();
  let [files, setFiles] = useState([]);
  let [show, setShow] = useState(false);
  let [convertBtn, setConvertBtn] = useState(false);
  let [imageTitle1, setimageTitle1] = useState("");
  let [imageTitle2, setimageTitle2] = useState("");
  let [chooseFileIcon, setChooseFileIcon] = useState(true);

  // single image
  const chooseFile = (event) => {
    setFile(event.target.files[0]);
    setConvertBtn(!convertBtn);
    setimageTitle1(event.target.files[0].name);
    setChooseFileIcon(!chooseFileIcon);
  };

  // single
  let convertFile = async (event) => {
    event.preventDefault();
    // console.log(file, "file");
    // const URL = "http://localhost:5700/single";   // NODE JS
    const URL = "http://localhost:3500/upload/single"; //NEST JS
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(URL, formData, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );

        window.open(url);
        setimageTitle1("");
      });
  };

  // multi image
  const chooseFiles = (event) => {
    setFiles(event.target.files);
    setConvertBtn(!convertBtn);
    setimageTitle2(event.target.files.length + " Files");
  };

  // multiple
  const convertFiles = async (event) => {
    event.preventDefault();
    // const URL = "http://localhost:5700/multiple";  //NodeJS
    const URL = "http://localhost:3500/upload/multiple"; //NESTJS
    const formData = new FormData();
    for (var m = 0; m < files.length; m++) {
      // console.log(files[m], "index");
      formData.append("file", files[m]);
    }
    await axios
      .post(URL, formData, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );

        window.open(url);
        setimageTitle2("");
      });
  };

  // show hide part
  const chooseOption = () => {
    setShow(!show);
    setimageTitle1("");
    setimageTitle2("");
  };

  const removeName = () => {
    setimageTitle1("");
    setimageTitle2("");
    setChooseFileIcon(chooseFileIcon);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="optionBtn">
          <Button variant="contained" onClick={chooseOption}>
            {show ? "Single Upload" : "Multiple Upload"}
          </Button>
        </div>
        {show ? (
          <div className="OperationBox">
            <p>Choose upto 50 files</p>
            <form onSubmit={convertFiles}>
              {imageTitle2 === "" ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                    name="file"
                    onChange={chooseFiles}
                  />
                  <div className="folderIcon">
                    <PermMediaSharpIcon />
                  </div>
                </IconButton>
              ) : null}
              <div>
                <span>{imageTitle2}</span>
                {imageTitle2 !== "" ? (
                  <CancelIcon
                    className="crossIcon"
                    onClick={removeName}
                  ></CancelIcon>
                ) : null}
              </div>
              <div>
                {imageTitle2 !== "" ? (
                  <Button
                    className="convertBtn"
                    variant="contained"
                    type="submit"
                  >
                    Convert
                  </Button>
                ) : null}
              </div>
            </form>
          </div>
        ) : (
          <div className="OperationBox">
            <p>Choose a file</p>
            <form onSubmit={convertFile}>
              {imageTitle1 === "" ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
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
                <span>{imageTitle1}</span>
                {imageTitle1 !== "" ? (
                  <CancelIcon
                    className="crossIcon"
                    onClick={removeName}
                  ></CancelIcon>
                ) : null}
              </div>
              {imageTitle1 !== "" ? (
                <div className="convertBtn">
                  <Button variant="contained" type="submit">
                    Convert
                  </Button>
                </div>
              ) : null}
            </form>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
