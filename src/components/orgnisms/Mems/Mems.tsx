import supabase from "config/supabaseClient";
import { useContext } from "react";
import { useMemContext } from "context/MemsContext";
import { MemCard } from "components/molecules/MemCard/MemCard";
import s from "./Mems.module.css";

interface MemType {
  created_at: string;
  id: string;
  img_src: string;
  user_id: string;
}

export const Mems = () => {
  const {mems,setMems} = useMemContext();
  const getFileNameFromSrc = (fileName: string) =>
    fileName.substring(fileName.lastIndexOf("/") + 1);

  const removeMemFromUi = (id: string) => {
    setMems((prevState: MemType[]) => prevState.filter((mem) => mem.id !== id));
  };

  const removeFromTables = async (id: string) => {
    return await supabase.from("mem").delete().match({ id });
  };
  const removeFromStorage = async (img_src: string) => {
    return await supabase.storage
      .from("mems")
      .remove([getFileNameFromSrc(img_src)]);
  };

  const handleRemoveMem = async (id: string, img_src: string) => {
    Promise.all([removeFromTables(id), removeFromStorage(img_src)]).then(
      ([removeFormTables, removeFormStorage]) => {
        if (
          removeFormTables.error === null &&
          removeFormStorage.error === null
        ) {
          removeMemFromUi(id);
          alert("wywalone");
        } else {
          alert("błąd usuwania");
        }
      }
    );
  };

  return (
    <div className={s.wrapper}>
      {mems.map((mem: MemType) => (
        <MemCard handleRemoveMem={handleRemoveMem} key={mem.id} mem={mem} />
      ))}
    </div>
  );
};
