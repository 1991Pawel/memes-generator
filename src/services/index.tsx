import supabase from "config/supabaseClient";

export const fetchMems = async (onSuccess:(data: any) => void,onFailure:(error: any) => void):Promise<void> => {
    const { data, error } = await supabase.from("mem").select();
    if (data) {
     onSuccess(data);
    }
    if (error) {
     onFailure(error);
    }
  };

//   export const removeFromTables = async (id: string) => {
//     return await supabase.from("mem").delete().match({ id });
//   };
//   const removeFromStorage = async (img_src: string) => {
//     return await supabase.storage
//       .from("mems")
//       .remove([getFileNameFromSrc(img_src)]);
//   };

// const handleRemoveMem = async (id: string, img_src: string) => {
//     Promise.all([removeFromTables(id), removeFromStorage(img_src)]).then(
//       ([removeFormTables, removeFormStorage]) => {
//         if (
//           removeFormTables.error === null &&
//           removeFormStorage.error === null
//         ) {
//           removeMemFromUi(id);
//           alert("wywalone");
//         } else {
//           alert("błąd usuwania");
//         }
//       }
//     );
//   };