import s from "./MemCreator.module.css";
import { useState, useRef, useEffect } from "react";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { toBlob } from "html-to-image";
import { useForm } from "react-hook-form";
import supabase from "../../config/supabaseClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    top: yup.string().required("Wpisz treść"),
    bottom: yup.string().required("Wpisz treść"),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export const MemCreator = () => {
  const [image, setImage] = useState(
    "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Neighbours_Siamese.jpg/640px-Neighbours_Siamese.jpg"
  );
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const ref = useRef(null);

  const convertHtmlToImage = (fileName: string) => {
    if (ref.current === null) return;

    return toBlob(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        if (dataUrl) {
          return new File([dataUrl], fileName, { type: "image/jpg" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveFileInStorage = async (fileName: string, image: File) => {
    const { data, error } = await supabase.storage
      .from("mems")
      .upload(fileName, image, {
        contentType: "image/jpg",
      });
    return { data, error };
  };

  const handleAddMem = async (user_id: string, data: any) => {
    if (
      process.env.REACT_APP_SUPABASE_URL &&
      process.env.REACT_APP_STORAGE_URL
    ) {
      const { error } = await supabase.from("mem").insert({
        user_id: user_id,
        img_src: `${
          process.env.REACT_APP_SUPABASE_URL +
          process.env.REACT_APP_STORAGE_URL +
          data.path
        }`,
      });
    }
  };

  const handleSaveMem = async () => {
    const fileName = `${+new Date()}.jpg`;
    const image = await convertHtmlToImage(fileName);
    if (!image) return;
    const getUser = sessionStorage.getItem("user");
    const parseUser = getUser ? JSON.parse(getUser) : null;
    const user_id = parseUser.user?.id;

    const { data, error } = await saveFileInStorage(fileName, image);
    if (data) {
      handleAddMem(user_id, data);
    }
    if (error) {
      alert("ERROR");
    }
  };

  return (
    <div className={s.creator}>
      <form>
        <div className={s.top}>
          <Input
            placeholder="Wpisz górną treść"
            label="Górna Treść"
            name="top"
            register={register}
            errors={errors}
          />

          <Input
            placeholder="Wpisz dolną treść"
            label="Dolna Treść"
            name="bottom"
            register={register}
            errors={errors}
          />
        </div>
        <div ref={ref} className={s.inner}>
          <p className={s.textTop}>{"przykładowy tekst góra"}</p>
          <img src={image} alt={""} />
          <p className={s.textBottom}>{"przykładowy teskt dół"}</p>
        </div>

        <Button onClick={handleSubmit(handleSaveMem)}>Wyślij</Button>
      </form>
    </div>
  );
};
