import { Layout } from "components/Layout/Layout";
import { MemCard } from "components/MemCard/MemCard";
import { MemCreator } from "components/MemCreator/MemCreator";
import React, { useEffect, useState } from "react";
import supabase from "config/supabaseClient";

export const HomePage = () => {
  const [mems, setMems] = useState<any>([]);

  const fetchMems = async () => {
    const { data, error } = await supabase.from("mem").select();
    if (data) {
      setMems(data);
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMems();
  }, []);

  return (
    <Layout>
      HOMEPAGE
      <MemCreator />
      <div>
        {mems.map((mem: any) => (
          <MemCard key={mem.id} mem={mem} />
        ))}
      </div>
    </Layout>
  );
};
