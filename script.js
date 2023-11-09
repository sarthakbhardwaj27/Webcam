const screen = document.querySelector(".screen");
const btn = document.querySelector(".btn");
const muteBtn = document.querySelector(".mute");

let isMute = false;
let stream = null;

muteBtn.addEventListener("click", () => {
  isMute = !isMute;
  console.log(isMute);
  //we can create a repeating function called startVideo()
  //if setting has been changed then we can pass startVideo() function again here
});

btn.addEventListener("click", () => {
  console.log(`camera on`);

  const mediaDevices = window.navigator.mediaDevices;

  mediaDevices
    .getUserMedia({
      video: { width: 720, height: 720 },
      audio: isMute,
    })
    .then((newStream) => {
      stream = newStream;
      screen.srcObject = newStream;
      screen.addEventListener("loadedmetadata", () => {
        screen.play();
      });
      console.log(stream.getTracks());
    })
    .catch((err) => {
      console.log(err);
    });
});

const stopbtn = document.querySelector(".stop");
stopbtn.addEventListener("click", () => {
  console.log(`stopped`);
  stream.getTracks().forEach((element) => {
    element.stop();
  });
  screen.srcObject = null;

  // Revoke camera access
  const mediaDevices = window.navigator.mediaDevices;
  if (mediaDevices && mediaDevices.getUserMedia) {
    mediaDevices.getUserMedia({}).then(
      () => {
        console.log("Camera access revoked");
      },
      (err) => {
        console.log("Unable to revoke camera access: ", err);
      }
    );
  }
});
