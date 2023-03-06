import "../App.css";
import { useState, useEffect, useRef } from "react";
import supabase from "../config/supabaseClient";
import { decode } from 'base64-arraybuffer'

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



function Dashboard() {
  const [randomImages, setRandomImages] = useState([]);
  const [image, setImage] = useState(null);
  const [height, width] = useWindowSize();
  const [bottomText, setBottomText] = useState("");
  const [topText, setTopText] = useState("");
  const canvasRef = useRef(null);
  const [draftImage,setDraftImage] = useState([])
  const [error,setError] = useState(null);
  const [mem,setMem] = useState(null);

  const fetchData = async() => {
    const { data, error } = await supabase
  .from('mem')
  .select()
    if(error) {
      setError('Błąd')
      setMem(null);
    }
    if(data) {
      setMem(data);
      setError(null)
    }
  }

  useEffect(() => {
    fetchData();
    let image = canvasRef.current.toDataURL('image/png');
    // console.log(image)
  },[])



  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
  
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
    
};

const createBlob = () => {
 
  // canvasRef.current.toBlob((blob) => {
    // const newImg = document.createElement('img');
    // const url = URL.createObjectURL(blob,'image/png');
    // setDraftImage(url)
    // console.log(url)
  
    // newImg.onload = () => {
    //   // no longer need to read the blob so it's revoked
    //   URL.revokeObjectURL(url);
    // };
  
    // newImg.src = url;
    // document.body.appendChild(newImg);
  // });
 
   
}

const handleSaveImage = async () => {
  let storageUrl = '/storage/v1/object/public/mems/'
  let id = + new Date()
  let fileName = `${id}.png`;

  const imageToSave = canvasRef.current.toDataURL("image/jpeg").split(';base64,')[1];
  const { data, error } = await supabase
  .storage
  .from('mems')
  .upload(fileName, decode(imageToSave), {
    contentType: 'image/png'
  })
  if(data) {
    const { error } = await supabase
  .from('mem')
  .insert({ id, img_src:`${process.env.REACT_APP_SUPABASE_URL + storageUrl + data.path}`})
  if(!error) {
    alert('Zapisano')
  }
  }
}

// const saveToDraft = () => {
//   const imageToSave = canvasRef.current.toDataURL()
//  setDraftImage((prevImages) => [...prevImages,imageToSave])
//  drawElement(imageToSave)

// }

  const fetchImages = async () => {
    const req = await fetch("https://api.imgflip.com/get_memes");
    const {
      data: { memes },
    } = await req.json();
    setRandomImages(memes.slice(0, 10));
  };

  const drawElement = (imageSrc) => {
      var ctx = canvasRef.current.getContext("2d");

      var image = new Image();
          image.onload = function() {
            ctx.drawImage(image, 0, 0);
          };
            image.src = imageSrc

        return <img src={image.src} alt="dsd" />;
  }

  useEffect(() => {
    const memImage = new Image();
    memImage.crossOrigin = 'anonymous';
    memImage.src =
      "./assets/test.jpg"
    memImage.onload = () => {
      setImage(memImage);
    };


  }, []);

 

  useEffect(() => {
    if (image) {
      const size = window.innerWidth >= 500 ? 470 : window.innerWidth - 30;
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
      ctx.shadowColor="black";
      ctx.shadowBlur=7;
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

      // ctx.fillText(bottomText, 50, 50, 300);
      // wrapText(ctx, bottomText, 50, 50, 100, 16);
    }

    // console.log("bum", height, width);
  }, [image, width, height, topText, bottomText]);

  return (
    <div className="App">
      <h1>MEM GEN</h1>
      <button onClick={handleSaveImage} className="button">
        Zapisz
      </button>
      <div className="images-container">
      

        <div className="canvas-wrapper">
       
         <div>
           text góra
         <input
            onChange={(e) => setTopText(e.target.value)}
            value={topText}
            type="text"
          />
         </div>
          <br />
         <div>text dół 
         <input
            onChange={(e) => setBottomText(e.target.value)}
            value={bottomText}
            type="text"
          /></div>
          <canvas width={300} height={300} ref={canvasRef}></canvas>
        </div>
       
      
      </div>
  
  {mem && (
    <div className="save-images">
    
      {mem.map((data) => (
        <div className="image" key={data.id}>
          <img src={data.img_src} alt="test" />
        </div>
      ))}
    </div>
  )}
      <div className="button-wrapper"> 
      <a className="link" id="download_image_link" href="download_link" onClick={saveImageToLocal}>Zapisz na komputer</a></div>
        {/* {draftImage.map((image) => 
        <img src={image.url}></img>
        )} */}

    </div>
  );
}

export default Dashboard;
