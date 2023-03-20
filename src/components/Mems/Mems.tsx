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

  const handleRemoveMem = async (id: string, img_src: string) => {
    await supabase.from("mem").delete().match({ id });
    const { data, error } = await supabase.storage
      .from("mems")
      .remove([getFileNameFromSrc(img_src)]);
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
