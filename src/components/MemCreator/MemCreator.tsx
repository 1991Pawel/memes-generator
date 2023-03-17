import s from "./MemCreator.module.css";
import { useState, useRef } from "react";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { toBlob, toPng } from "html-to-image";
import { decode } from "base64-arraybuffer";

import supabase from "../../config/supabaseClient";
export const MemCreator = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(
    "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Neighbours_Siamese.jpg/640px-Neighbours_Siamese.jpg"
  );
  const ref = useRef(null);

  // const fetchData = async () => {
  //   const { data, error } = await supabase.from("mem").select();
  //   if (error) {
  //     setError("Błąd");
  //     setMem(null);
  //   }
  //   if (data) {
  //     setMem(data);
  //     setError(null);
  //   }
  // };
  // const handleSaveImage = async () => {
  //   let storageUrl = "/storage/v1/object/public/mems/";
  //   let id = +new Date();
  //   let fileName = `${id}.png`;
  //   let user_id = sessionStorage.getItem("user_id");

  //   const imageToSave = canvasRef.current
  //     .toDataURL("image/jpeg")
  //     .split(";base64,")[1];
  //   const { data, error } = await supabase.storage
  //     .from("mems")
  //     .upload(fileName, decode(imageToSave), {
  //       contentType: "image/png",
  //     });

  //   if (data) {
  //     const { error } = await supabase.from("mem").insert({
  //       id,
  //       user_id: JSON.parse(user_id),
  //       img_src: `${
  //         process.env.REACT_APP_SUPABASE_URL + storageUrl + data.path
  //       }`,
  //     });
  //     {
  //       console.log(sessionStorage.getItem("user_id"));
  //       console.log(JSON.parse(user_id));
  //     }
  //     if (!error) {
  //       alert("Zapisano");
  //     }
  //   }
  // };

  const convertHtmlToImage = (fileName: string) => {
    if (ref.current === null) {
      return;
    }

    return toBlob(ref.current, { cacheBust: true })
      .then((dataUrl: any) => {
        return new File([dataUrl], fileName, { type: "image/jpg" });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleSaveMem = async () => {
    let id = +new Date();
    let fileName = `${id}.jpg`;
    let storageUrl = "/storage/v1/object/public/mems/";
    const image = await convertHtmlToImage(fileName);
    if (!image) return;
    let getUser = sessionStorage.getItem("user");
    let parseUser = getUser ? JSON.parse(getUser) : null;
    let user_id = parseUser.user?.id;

    const { data, error } = await supabase.storage
      .from("mems")
      .upload(fileName, image, {
        contentType: "image/jpg",
      });

    if (data && user_id) {
      console.log("wejdz", data, user_id);
      const { error } = await supabase.from("mem").insert({
        id,
        user_id: user_id,
        img_src: `${
          process.env.REACT_APP_SUPABASE_URL + storageUrl + data.path
        }`,
      });

      if (!error) {
        alert("Zapisano");
      } else {
        alert("błąd");
      }
    }
  };

  return (
    <div className={s.creator}>
      <div className={s.top}>
        <label htmlFor="text">Tekst mema</label>
        <input
          onChange={(e) => setText(e.target.value)}
          id="name"
          name="text"
          type="text"
        />
      </div>
      <div ref={ref} className={s.inner}>
        <p className={s.text}>{text}</p>
        <img src={image} alt={text} />
      </div>

      <Button onClick={handleSaveMem}>Gotowe</Button>
    </div>
  );
};
