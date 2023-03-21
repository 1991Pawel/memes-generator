import supabase from "config/supabaseClient";
import { useEffect, useState } from "react";
import { MemCard } from "components/MemCard/MemCard";
import s from "./Mems.module.css";

interface MemType {
  created_at: string;
  id: string;
  img_src: string;
  user_id: string;
}

export const Mems = () => {
  const [mems, setMems] = useState<MemType[] | any>([]);
  const getFileNameFromSrc = (fileName: string) =>
    fileName.substring(fileName.lastIndexOf("/") + 1);

  const fetchMems = async () => {
    const { data, error } = await supabase.from("mem").select();
    if (data) {
      setMems(data);
    }
    if (error) {
      console.log(error);
    }
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
          alert("wywalone");
        } else {
          alert("błąd usuwania");
        }
      }
    );
  };

  useEffect(() => {
    fetchMems();
  }, []);

  return (
    <div className={s.wrapper}>
      {mems.map((mem: MemType) => (
        <MemCard handleRemoveMem={handleRemoveMem} key={mem.id} mem={mem} />
      ))}
    </div>
  );
};
