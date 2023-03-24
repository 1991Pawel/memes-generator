import { useMemContext, MemType } from "context/MemsContext";
import { MemCard } from "components/molecules/MemCard/MemCard";
import s from "./Mems.module.css";
import { removeMem } from "../../../services/index";

export const Mems = () => {
  const { mems } = useMemContext();

  const onSuccess = () => {
    console.log("success");
    alert("success");
  };
  const onFailure = () => {
    console.log("fail");
    alert("fail");
  };

  const handleRemoveMem = (mem: MemType) => {
    removeMem({ onSuccess, onFailure, mem });
  };

  return (
    <div className={s.wrapper}>
      {mems.map((mem: MemType) => (
        <MemCard
          handleRemoveMem={() => handleRemoveMem(mem)}
          key={mem.id}
          mem={mem}
        />
      ))}
    </div>
  );
};
