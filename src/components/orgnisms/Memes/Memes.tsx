import { useMemContext, MemeType } from "context/MemesContext";
import { MemCard } from "components/molecules/MemeCard/MemeCard";
import s from "./Memes.module.css";
import { removeMeme } from "../../../services/index";

export const Memes = () => {
  const { memes } = useMemContext();

  const onSuccess = () => {
    console.log("success");
    alert("success");
  };
  const onFailure = () => {
    console.log("fail");
    alert("fail");
  };

  const handleRemoveMeme = (meme: MemeType) => {
    removeMeme({ onSuccess, onFailure, meme });
  };

  return (
    <div className={s.wrapper}>
      {memes.map((meme: MemeType) => (
        <MemCard
          handleRemoveMeme={() => handleRemoveMeme(meme)}
          key={meme.id}
          meme={meme}
        />
      ))}
    </div>
  );
};
