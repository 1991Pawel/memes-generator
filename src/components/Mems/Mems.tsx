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

  const fetchMems = async () => {
    const { data, error } = await supabase.from("mem").select();
    if (data) {
      setMems(data);
      console.log(data, "data");
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMems();
  }, []);

  return (
    <div className={s.wrapper}>
      {mems.map((mem: MemType) => (
        <MemCard key={mem.id} mem={mem} />
      ))}
    </div>
  );
};
