const screen = document.querySelector(".screen");
const btn = document.querySelector(".btn");
let stream = null;
btn.addEventListener("click", () => {
  console.log(`button clicked`);
  const mediaDevices = window.navigator.mediaDevices;
  mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
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
  console.log(`stopped`)
  stream.getTracks().forEach((element) => {
    element.stop();
  });
  screen.srcObject = null;
});
