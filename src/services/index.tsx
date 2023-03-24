import supabase from "config/supabaseClient";
const getFileNameFromSrc = (fileName: string) =>
fileName.substring(fileName.lastIndexOf("/") + 1);
export const fetchMems = async (onSuccess:(data: any) => void,onFailure:(error: any) => void):Promise<void> => {
    const { data, error } = await supabase.from("mem").select();
    if (data) {
     onSuccess(data);
    }
    if (error) {
     onFailure(error);
    }
  };


  export const removeMem = async (onSucess:any,onFailure:any,payload:any) => {
    
     
    Promise.all([removeFromTables(payload.id), removeFromStorage(payload.img_src)]).then(
      ([removeFormTables, removeFormStorage]) => {
        if (
          removeFormTables.error === null &&
          removeFormStorage.error === null
        ) {
       
          alert("wywalone");
        } else {
          alert("błąd usuwania");
        }
      })
}

    
  

  export const removeFromTables = async (id: string) => {
    return await supabase.from("mem").delete().match({ id });
  };
  const removeFromStorage = async (img_src: string) => {
    return await supabase.storage
      .from("mems")
      .remove([getFileNameFromSrc(img_src)]);
  };

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