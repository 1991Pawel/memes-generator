import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";
import { useContext } from "react";
import supabase from "config/supabaseClient";
import { fetchMems } from "services";

export interface MemType {
  created_at: string;
  id: string;
  img_src: string;
  user_id: string;
}
interface ModalState {
  mems: MemType[];
  setMems: React.Dispatch<SetStateAction<MemType[]>>;
}

export const MemContext = createContext<ModalState | null>(null);

export const MemContextProvider = ({ children }: { children: ReactNode }) => {
  const [mems, setMems] = useState<MemType[]>([]);
  const myAbortController = new AbortController();

  const onSuccess = (data: MemType[]) => {
    setMems(data);
  };
  const onFailure = (error: string) => {
    console.log(error);
  };

  useEffect(() => {
    fetchMems(onSuccess, onFailure);

    return () => myAbortController.abort();
  }, []);

  return (
    <MemContext.Provider value={{ mems, setMems }}>
      {children}
    </MemContext.Provider>
  );
};

export const useMemContext = () => {
  const ctx = useContext(MemContext);
  if (!ctx) {
    throw new Error("You forgot MemContextProvider");
  }
  return ctx;
};
