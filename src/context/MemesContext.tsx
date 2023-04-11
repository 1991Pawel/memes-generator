import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { useContext } from "react";
import { fetchMemes } from "services";

export interface MemeType {
  created_at: string;
  id: string;
  img_src: string;
  user_id: string;
}
interface ModalState {
  memes: MemeType[];
  onSuccess:(data: MemeType[]) => void
  onFailure: (error: PostgrestError) => void
}

export const MemesContext = createContext<ModalState | null>(null);

export const MemesContextProvider = ({ children }: { children: ReactNode }) => {
  const [memes, setMemes] = useState<MemeType[]>([]);

  const onSuccess = (data: MemeType[]) => {
    setMemes(data);
  };
  const onFailure = (error: PostgrestError) => {
    console.log(error);
  };


  return (
    <MemesContext.Provider value={{ memes,onSuccess,onFailure }}>
      {children}
    </MemesContext.Provider>
  );
};

export const useMemContext = () => {
  const ctx = useContext(MemesContext);
  if (!ctx) {
    throw new Error("You forgot MemContextProvider");
  }
  return ctx;
};
