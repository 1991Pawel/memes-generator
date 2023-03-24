import supabase from "config/supabaseClient";
import { getFileNameFromSrc } from "../utils/index";

export const fetchMems = async (
  onSuccess: (data: any) => void,
  onFailure: (error: any) => void
): Promise<void> => {
  const { data, error } = await supabase.from("mem").select();
  if (data) {
    onSuccess(data);
  }
  if (error) {
    onFailure(error);
  }
};

interface RemoveMemInterface {
  onSuccess: () => void;
  onFailure: () => void;
  mem: { img_src: string; id: string };
}

export const removeMem = async ({
  onSuccess,
  onFailure,
  mem,
}: RemoveMemInterface): Promise<void> => {
  Promise.all([removeFromTables(mem.id), removeFromStorage(mem.img_src)]).then(
    ([removeFormTables, removeFormStorage]) => {
      if (removeFormTables.error === null && removeFormStorage.error === null) {
        onSuccess();
      } else {
        onFailure();
      }
    }
  );
};

export const removeFromTables = async (id: string) => {
  return await supabase.from("mem").delete().match({ id });
};

const removeFromStorage = async (img_src: string) => {
  return await supabase.storage
    .from("mems")
    .remove([getFileNameFromSrc(img_src)]);
};
