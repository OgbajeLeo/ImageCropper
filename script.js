const image = document.getElementById("image");
const cropper = new Cropper(image, {
  aspectRatio: 0,
});

let isActive = false;

/* document.querySelector("#btn-crop").addEventListener("click", function () {
  var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
   document.getElementById("output").src = croppedImage;
   document.querySelector("#cropped-container").style.display = "flex";
 });
 */

document.querySelector("#btn-crop").addEventListener("click", function () {
  const croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
  const link = document.createElement("a");
  link.href = croppedImage;
  link.download = "cropped_image.png"; 

  link.click();
});

// Zoom In
document.getElementById("zoom1").addEventListener("click", function () {
  cropper.zoom(-0.1);
  activeBtn()
});

// Zoom Out
document.getElementById("zoom2").addEventListener("click", function () {
  cropper.zoom(0.1);
  activeBtn()
});

// Rotate Left
document.getElementById("rotateLeft").addEventListener("click", function () {
  cropper.rotate(-90);
  activeBtn()
});

// Rotate Right
document.getElementById("rotateRight").addEventListener("click", function () {
  cropper.rotate(90);
  activeBtn()
});

// Reset
document.getElementById("reset").addEventListener("click", function () {
  cropper.reset();
  if (document.getElementById("reset").classList.contains("text-black")) {
    document.getElementById("reset").classList.add("text-gray-300");
    document.getElementById("reset").classList.add("border-gray-300");
    document.getElementById("reset").classList.remove("text-black");
    document.getElementById("reset").classList.remove("border-black");
  }
});

function activeBtn(){
  if (document.getElementById("reset").classList.contains("text-gray-300")) {
    document.getElementById("reset").classList.remove("text-gray-300");
    document.getElementById("reset").classList.remove("border-gray-300");
    document.getElementById("reset").classList.add("text-black");
    document.getElementById("reset").classList.add("border-black");
  }
}

// Close
function closeCard() {
  document.querySelector("#card").style.display = "none";
}

const changePhotoText = document.getElementById("changePhoto");

// Change Photo
changePhotoText.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload =  (event) => {
        const image = document.getElementById("image");
        image.src =  event.target.result;
        cropper.replace(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  });

  fileInput.click();
});
