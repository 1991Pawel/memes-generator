import s from "./MemCreator.module.css";
import { useState, useRef, useEffect } from "react";
import { Input } from "components/atoms/Input/Input";
import { Button } from "components/atoms/Button/Button";
import { useForm } from "react-hook-form";
import supabase from "../../../config/supabaseClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import image01 from "./img/01.jpg";
import image02 from "./img/02.jpg";
import image03 from "./img/03.jpg";
import html2canvas from "html2canvas";

interface MemImageType {
  id: string;
  bg: string;
}

const memImages = [
  {
    id: 1,
    bg: image01,
  },
  {
    id: 2,
    bg: image02,
  },
  {
    id: 3,
    bg: image03,
  },
];

const schema = yup
  .object({
    top: yup.string().required("Wpisz treść"),
    bottom: yup.string().required("Wpisz treść "),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export const MemCreator = () => {
  const [selectedImage, setSelectedImage] = useState(memImages[0]);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const ref = useRef(null);
  const [textTop, textBottom] = watch(["top", "bottom"]);

  const convertHtmlToImage = async () => {
    if (ref.current === null) return;
    const canvas = await html2canvas(ref.current);
    const getBlobFromCanvas = (canvas: HTMLCanvasElement) =>
      new Promise((res, rej) => {
        canvas.toBlob((blob) => {
          if (blob) {
            res(blob);
          } else {
            rej(alert("błąd"));
          }
        });
      });
    return getBlobFromCanvas(canvas);
  };

  const saveFileInStorage = async (fileName: string, image: any) => {
    const { data, error } = await supabase.storage
      .from("mems")
      .upload(fileName, image, {
        contentType: "image/jpg",
      });
    return { data, error };
  };

  const handleAddMem = async (user_id: string, path: string) => {
    if (
      process.env.REACT_APP_SUPABASE_URL &&
      process.env.REACT_APP_STORAGE_URL
    ) {
      const { error } = await supabase.from("mem").insert({
        user_id: user_id,
        img_src: `${
          process.env.REACT_APP_SUPABASE_URL +
          process.env.REACT_APP_STORAGE_URL +
          path
        }`,
      });
      if (error) {
        alert("błąd");
      }
    }
  };

  const handleSaveMem = async () => {
    const fileName = `${+new Date()}.jpg`;
    const image = await convertHtmlToImage();
    if (!image) return;
    const getUser = sessionStorage.getItem("user");
    const parseUser = getUser ? JSON.parse(getUser) : null;
    const user_id = parseUser.user?.id;

    const { data, error } = await saveFileInStorage(fileName, image);
    if (data && data.path) {
      alert("zapisano");
      handleAddMem(user_id, data.path);
    }
    if (error) {
      alert("ERROR");
    }
  };

  const handleChangeImage = (img: any) => {
    setSelectedImage(img);
  };

  return (
    <form className={s.form}>
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
      <div className={s.selectImage}>
        {memImages.map((img, id) => (
          <button
            key={id}
            onClick={() => handleChangeImage(img)}
            type="button"
            className={s.imageButton}
          >
            <img className={s.image} src={img.bg} alt="" />
          </button>
        ))}
      </div>

      <div ref={ref} className={s.inner}>
        <div className={s.textTop}>{textTop}</div>
        <img className={s.memImage} src={selectedImage.bg} alt="" />
        <div className={s.textBottom}>{textBottom}</div>
      </div>

      <Button onClick={handleSubmit(handleSaveMem)}>Wyślij</Button>
    </form>
  );
};