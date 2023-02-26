import "./App.css";
import { useState, useEffect, useRef } from "react";

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

function App() {
  const [randomImages, setRandomImages] = useState([]);
  const [image, setImage] = useState(null);
  const [height, width] = useWindowSize();
  const [bottomText, setBottomText] = useState("");
  const [topText, setTopText] = useState("");
  const canvasRef = useRef(null);

  const fetchImages = async () => {
    const req = await fetch("https://api.imgflip.com/get_memes");
    const {
      data: { memes },
    } = await req.json();
    setRandomImages(memes.slice(0, 10));
  };

  useEffect(() => {
    const memImage = new Image();
    memImage.src =
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80";
    memImage.onload = () => setImage(memImage);
  }, []);

  // useEffect(() => {
  //   if (canvasRef) {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     ctx.fillStyle = "blue";
  //     ctx.fillRect(25, 300, 300, 50);
  //     canvas.width = 300;
  //     canvas.height = 300;
  //   }

  //   console.log(ctx);
  //   const canvas = canvasRef.current;
  //   const dpr = window.devicePixelRatio || 1;
  //   let rect = canvas.getBoundingClientRect();
  //   canvas.width = rect.width * dpr;
  //   canvas.height = rect.height * dpr;
  //   const ctx = canvas.getContext("2d");
  //   if (image && canvas) {
  //   }
  // }, [image, canvasRef]);

  useEffect(() => {
    if (image) {
      const size = window.innerWidth - 30;
      const scale = window.devicePixelRatio;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = "20px Comic Sans MS";

      ctx.fillStyle = "white";
      ctx.fillText(topText, size / 2, 25);
      ctx.fillText(bottomText, -size / 2, 25);
    }

    // console.log("bum", height, width);
  }, [image, width, height, topText, bottomText]);

  return (
    <div className="App">
      <h1>MEM GEN</h1>

      <div className="images-container">
        <div className="canvas-wrapper">
          <input
            onChange={(e) => setTopText(e.target.value)}
            value={topText}
            type="text"
          />
          <br />
          <input
            onChange={(e) => setBottomText(e.target.value)}
            value={bottomText}
            type="text"
          />
          <canvas width={300} height={300} ref={canvasRef}></canvas>
        </div>
        {randomImages.map((image) => (
          <div key={image.id} className="image">
            <img src={image.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
