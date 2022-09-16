import { useState, useEffect } from "react";
import "./App.css";

function RangeChange(e) {
  e.target.style.backgroundSize =
    ((e.target.value - e.target.min) * 100) / (e.target.max - e.target.min) +
    "% 100%";
}

let canvasContext;

function App() {
  const [propetries, setpropetries] = useState({
    blur: 0,
    sepia: 0,
    opacity: 100,
    brightness: 100,
    saturate: 100,
    grayscale: 0,
    rotate: 0,
    radius: 100,
  });

  useEffect(() => {
    const inputs = [...document.querySelectorAll('input[type="range"]')];
    inputs.map((node) => {
      RangeChange({ target: node });
    });
  }, []);

  async function submit(e) {
    const image = document.getElementById("imgshow");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convierte la imagen a una cadena en base64
        image.src = reader.result;
        const canvas = document.getElementById("canvasImg");
        const ctx = canvas.getContext("2d");
        canvasContext = ctx;
        canvasContext.save();
        const GOODimage = new Image();
        GOODimage.src = reader.result;
        GOODimage.onload = () => {
          setpropetries({
            blur: 0,
            sepia: 0,
            opacity: 100,
            brightness: 100,
            saturate: 100,
            grayscale: 0,
            rotate: 0,
            radius: 100,
          });
          canvas.width = GOODimage.naturalWidth;
          canvas.height = GOODimage.naturalHeight;
          ctx.drawImage(GOODimage, 0, 0);
        };

        GOODimage.src = reader.result;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    const canvas = document.getElementById("canvasImg");
    console.log("jum");
    if (canvasContext) {
      canvasContext.restore();
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      const imagenCANVAS = document.getElementById("imgshow");
      canvasContext.filter = `blur(${propetries.blur + "px"}) sepia(${
        propetries.sepia + "%"
      })  opacity(${propetries.opacity + "%"}) grayscale(${
        propetries.grayscale + "%"
      }) brightness(${propetries.brightness + "%"}) saturate(${
        propetries.saturate + "%"
      }) hue-rotate(${propetries.rotate + "deg"})`;

      canvasContext.beginPath();
      canvasContext.arc(
        canvas.width / 2,
        canvas.height / 2,
        (canvas.width / 100) * propetries.radius,
        0,
        2 * Math.PI
      );
      canvasContext.clip();
      canvasContext.drawImage(imagenCANVAS, 0, 0);
    }
  }, [propetries]);

  return (
    <div className="App">
      <div className="table">
        <label htmlFor="inputFile" className="inputMask">
          Upload image
        </label>
        <input
          type="file"
          name="image"
          required
          accept=".jpg,.png"
          onChange={submit}
          id="inputFile"
        />
        <div className="block">
          <label> Blur:</label>
          <input
            type="range"
            value={propetries.blur}
            min="0"
            max="12"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, blur: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> Sepia:</label>
          <input
            type="range"
            value={propetries.sepia}
            min="0"
            max="100"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, sepia: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> Color transformation</label>
          <input
            type="range"
            value={propetries.rotate}
            min="0"
            max="100"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, rotate: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> Grayscale:</label>
          <input
            type="range"
            value={propetries.grayscale}
            min="0"
            max="100"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, grayscale: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> Opacity:</label>
          <input
            type="range"
            value={propetries.opacity}
            min="0"
            max="100"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, opacity: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> Saturate:</label>
          <input
            type="range"
            value={propetries.saturate}
            min="0"
            max="100"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, saturate: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> Brightness:</label>
          <input
            type="range"
            value={propetries.brightness}
            min="0"
            max="200"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, brightness: e.target.value });
            }}
          />
        </div>
        <div className="block">
          <label> radius:</label>
          <input
            type="range"
            value={propetries.radius}
            min="10"
            max="100"
            onChange={(e) => {
              RangeChange(e);
              setpropetries({ ...propetries, radius: e.target.value });
            }}
          />
        </div>
        <button
          onClick={() => {
            const canvas = document.getElementById("canvasImg");
            const imgToDownload = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "my-image.png";
            link.href = imgToDownload;
            link.click();
            link.remove();
          }}
        >
          Download
        </button>
      </div>

      <img src="" alt="" id="imgshow" crossOrigin="anonymous" />
      <div className="canvascontent">
        <canvas id="canvasImg"></canvas>
      </div>
    </div>
  );
}

export default App;
