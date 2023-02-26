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

const wrapText = function (ctx, text, x, y, maxWidth, lineHeight) {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(" ");
  let line = ""; // This will store the text of the current line
  let testLine = ""; // This will store the text when we add a word, to test if it's too long
  let lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for (var n = 0; n < words.length; n++) {
    // Create a test line, and measure it..
    testLine += `${words[n]} `;
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    // If the width of this test line is more than the max width
    if (testWidth > maxWidth && n > 0) {
      // Then the line is finished, push the current line into "lineArray"
      lineArray.push([line, x, y]);
      // Increase the line height, so a new line is started
      y += lineHeight;
      // Update line and test line to use this word as the first word on the next line
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      // If the test line is still less than the max width, then add the word to the current line
      line += `${words[n]} `;
    }
    // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
    if (n === words.length - 1) {
      lineArray.push([line, x, y]);
    }
  }
  // Return the line array
  return lineArray;
};

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
      let fontSize = window.innerWidth > 500 ? 50 : 35;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px Comic Sans MS`;

      ctx.fillStyle = "white";
      ctx.fillText(
        topText,
        size / 2 - ctx.measureText(topText).width / 2,
        fontSize === 50 ? canvas.height - size + 70 : canvas.height - size + 50
      );
      ctx.fillText(
        bottomText,
        size / 2 - ctx.measureText(bottomText).width / 2,
        fontSize === 50 ? size - 70 : size - 50
      );

      console.log(ctx.measureText(topText).width);
      // ctx.fillText(bottomText, 50, 50, 300);
      // wrapText(ctx, bottomText, 50, 50, 100, 16);
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
