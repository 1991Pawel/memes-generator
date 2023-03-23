import { createContext, useState, useEffect, ReactNode } from "react";
import { useContext } from "react";
import supabase from "config/supabaseClient";
import { fetchMems } from "services";

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


  const onSuccess = (data:any) => {
    setMems(data)
  }
  const onFailure = (error:any) => {
    console.log(error)
  }


  useEffect(() => {
    fetchMems(onSuccess,onFailure);
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
