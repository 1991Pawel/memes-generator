import { createContext, useState, useEffect, ReactNode } from "react";
import { useContext } from "react";
import supabase from "config/supabaseClient";

interface MemContextProps {
  children: ReactNode;
}

interface ModalState {
  mems: any;
  setMems:any;
}

export const MemContext = createContext<ModalState | null>(null);

export const MemContextProvider = ({ children }: MemContextProps) => {
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

  return <MemContext.Provider value={{mems,setMems} }>{children}</MemContext.Provider>;
};

export const useMemContext = () => {
  const ctx = useContext(MemContext);
  if (!ctx) {
    throw new Error("You forgot MemContextProvider");
  }
  return ctx;
};
