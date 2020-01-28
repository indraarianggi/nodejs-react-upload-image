import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import DefaultImg from "./default-img.jpg";

// Base api url being used
const API_URL = "http://localhost:3000/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multerImage: DefaultImg
    };
  }

  setDefaultImage() {
    this.setState({
      multerImage: DefaultImg
    });
  }

  // function to upload image once it has been captured
  uploadImage(e) {
    let imageFormObj = new FormData();

    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", e.target.files[0]);

    // stores a readable instance of the image being uploaded using multer
    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0])
    });

    axios.post(`${API_URL}/image/uploadmulter`, imageFormObj).then(data => {
      if (data.data.success) {
        alert("Image has been successfully uploaded using multer");
        this.setDefaultImage();
      }
    });
  }

  render() {
    return (
      <div className="main-container">
        <h3 className="main-heading">Upload Image using Multer</h3>

        <div className="image-container">
          <div className="process">
            <p className="process__details">
              Upload image to node server, connected to a MongoDB database, with
              the help of Multer
            </p>

            <input
              type="file"
              className="process__upload-btn"
              onChange={e => this.uploadImage(e)}
            />
            <img
              src={this.state.multerImage}
              alt="upload-image"
              className="process__image"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
