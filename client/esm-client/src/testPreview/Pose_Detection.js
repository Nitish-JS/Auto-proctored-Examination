import React,{useRef} from 'react'
import swal from 'sweetalert';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';


const Posenet = () => {
  const webcamRef=useRef(null);
  const canvasRef=useRef(null);

//  Load posenet
const runPosenet = async () => {
  const net = await posenet.load({
    architecture: 'ResNet50',
    quantBytes: 2,
    inputResolution: { width: 400, height: 400 },
    scale: 0.6,
  });
  //
  setInterval(() => {
    detect(net);
  }, 5000);
};

const detect = async (net) => {
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;
    const pose = await net.estimateSinglePose(video);
    EarsDetect(pose["keypoints"], 0.8);
  }
};


const EarsDetect=(keypoints, minConfidence) =>{
  //console.log("Checked")
  const keypointEarR = keypoints[3];
  const keypointEarL = keypoints[4];

  if(keypointEarL.score<minConfidence){
    swal("You looked away from the Screen (To the Right)")
  }
  if (keypointEarR.score<minConfidence){
    swal("You looked away from the Screen (To the Left)")
  }
}

runPosenet();
  return (<div>
    <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 400,
            height: 400,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 200,
            height: 200,
          }}
        />
  </div>
  )
}

export default Posenet;