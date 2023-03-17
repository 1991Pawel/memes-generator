import s from "./MemCreator.module.css";
import { useState, useRef } from "react";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { toBlob } from "html-to-image";

import supabase from "../../config/supabaseClient";
export const MemCreator = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(
    "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Neighbours_Siamese.jpg/640px-Neighbours_Siamese.jpg"
  );
  const ref = useRef(null);

  const convertHtmlToImage = (fileName: string) => {
    if (ref.current === null) return;

    return toBlob(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        if (dataUrl) {
          return new File([dataUrl], fileName, { type: "image/jpg" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveFileInStorage = async (fileName: string, image: File) => {
    const { data, error } = await supabase.storage
      .from("mems")
      .upload(fileName, image, {
        contentType: "image/jpg",
      });
    return { data, error };
  };

  const handleAddMem = async (user_id: string, data: any) => {
    if (
      process.env.REACT_APP_SUPABASE_URL &&
      process.env.REACT_APP_STORAGE_URL
    ) {
      const { error } = await supabase.from("mem").insert({
        user_id: user_id,
        img_src: `${
          process.env.REACT_APP_SUPABASE_URL +
          process.env.REACT_APP_STORAGE_URL +
          data.path
        }`,
      });
    }
  };

  const handleSaveMem = async () => {
    const fileName = `${+new Date()}.jpg`;
    const image = await convertHtmlToImage(fileName);
    if (!image) return;
    const getUser = sessionStorage.getItem("user");
    const parseUser = getUser ? JSON.parse(getUser) : null;
    const user_id = parseUser.user?.id;

    const { data, error } = await saveFileInStorage(fileName, image);
    handleAddMem(user_id, data);
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
