import React from "react";

import imageCompression from "browser-image-compression";

import Card from "react-bootstrap/Card";

class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();
    

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Bring a bigger image");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="wrapper" style={{backgroundColor:"#263238",height:"100%"}}>
        
        <div className="shadow p-3 mb-5 "  style={{backgroundColor:"#37474F"}}>
        <nav className="navbar text-white" style={{backgroundColor:"#37474F"}}>
          <div className="container justify-content-center" style={{backgroundColor:"#37474F"}}>
            <h3 className="h3-responsive nav-brand text-center ">COMPRESSOR</h3>
          </div>
        </nav>
        </div>

        <div className="container rounded p-3 mb-10 rounded shadow" style={{backgroundColor:"#37474F"}}>
          <div className="row justify-content-center " style={{backgroundColor:"#37474F"}}>
            
              <div className="col-9">
                <br/>
                {this.state.uploadImage ? (
                  <div className="container rounded shadow" style={{backgroundColor:"#455A64",padding:"3%"}}>
                    <Card.Img
                      className="ht"
                      variant="top"
                      src={this.state.originalLink}/>
                  </div>):(
                  <div className="rounded align-items-center text-center" 
                      style={{backgroundImage:"linear-gradient(#FFAFBD, #ffc3a0)",height:"250px"}}>
                        <br/>
                        <h3 className="h3-responsive rounded" style={{backgroundColor:"rgba(255,255,255,0.3)",margin:"25px",padding:"20px"}}>
                          Your Image goes Here
                        </h3>
                        
                  </div>)
                }
                <br/>
                <div className="d-flex justify-content-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="btn btn-white btn-dark "
                    onChange={e => this.handle(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">   
              <div className="col-12 d-flex justify-content-center">

                {this.state.outputFileName ? (
                    <button 
                      type="button"
                      value="Compress"
                      style={{ backgroundColor:"#FF7597"}}
                      className="mt-2 w-25 btn"
                      onClick={e => this.click(e)}>
                      Compress</button>) : (<></>)}
              </div> 
            </div>
            
            <br/>
            <div className="row justify-content-center">
            <div className="col-9 ">
            {this.state.clicked ? (
              
              <div className="container rounded shadow" style={{backgroundColor:"#455A64",padding:"3%"}}>
                {window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})}
              <Card.Img variant="top" src={this.state.compressedLink}/>
              </div>) : (<></>)}
            </div>
            </div>
            {this.state.clicked ? (
            <div className="d-flex justify-content-center">
                  <a href={this.state.compressedLink}
                    download={this.state.outputFileName}
                    style={{ backgroundColor:"#FF7597"}}
                      
                    className="mt-2 btn  w-25">
                    Download
                  </a>
            </div>):(<></>)}

          </div>
          <br/>
          <div className="container  text-center shadow p-3 mb-5 "  style={{backgroundColor:"#37474F"}}>
          
            <h5 className="responsive text-center" >I Care for Your Privacy.</h5>
            <i class="fa fa-heart heart fa-x" style={{ color:"#FF7597"}}></i>
            <h6 className="responsive text-center" >The Image you upload to this site is not used or stored in our server. So You remain saved from online spying</h6>
              <br/>
            <h6 className="responsive text-center" >Reduce Your Photos Size By More Than 90 %</h6>
              
         </div>

          <footer id="sticky-footer" class=" footer py-4 text-white" style={{backgroundColor:"#37474F"
          ,width: "100%",  margintop:"-180px",clear:"both",position:"relative"}}>
            <div class="container text-center">
              Made with...<i class="fa fa-heart heart fa-x" style={{ color:"#FF7597"}}></i>...by Aalap
            </div>
          </footer>
         
      </div>
    );
  }
}

export default imageCompressor;
