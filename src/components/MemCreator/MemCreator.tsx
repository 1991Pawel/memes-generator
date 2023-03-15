import s from "./MemCreator.module.css";
import { useState } from "react";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";

export const MemCreator = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(
    "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Neighbours_Siamese.jpg/640px-Neighbours_Siamese.jpg"
  );
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
      <div className={s.inner}>
        <p className={s.text}>{text}</p>
        <img src={image} alt={text} />
      </div>
      <Button>Gotowe</Button>
    </div>
  );
};
