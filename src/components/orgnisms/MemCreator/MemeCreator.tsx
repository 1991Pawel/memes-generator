import s from "./MemeCreator.module.css";
import { useState, useRef } from "react";
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

interface MemeImageType {
  id: number;
  bg: string;
}

const memesImages = [
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

export const MemeCreator = () => {
  const [selectedImage, setSelectedImage] = useState(memesImages[0]);
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
      .from("memes")
      .upload(fileName, image, {
        contentType: "image/jpg",
      });
    return { data, error };
  };

  const handleAddMeme = async (user_id: string, path: string) => {
    if (
      process.env.REACT_APP_SUPABASE_URL &&
      process.env.REACT_APP_STORAGE_URL
    ) {
      const { error } = await supabase.from("meme").insert({
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

  const handleSaveMeme = async () => {
    const fileName = `${+new Date()}.jpg`;
    const blob = await convertHtmlToImage();
    if (!blob) return;
    const getUser = sessionStorage.getItem("user");
    const parseUser = getUser ? JSON.parse(getUser) : null;
    const user_id = parseUser.user?.id;

    const { data, error } = await saveFileInStorage(fileName, blob);
    if (data && data.path) {
      alert("zapisano");
      handleAddMeme(user_id, data.path);
    }
    if (error) {
      alert("ERROR");
    }
  };

  const handleChangeImage = (img: MemeImageType) => {
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
          error={errors["top"]}
        />

        <Input
          placeholder="Wpisz dolną treść"
          label="Dolna Treść"
          name="bottom"
          register={register}
          error={errors["bottom"]}
        />
      </div>
      <div className={s.selectImage}>
        {memesImages.map((img, id) => (
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
        <img className={s.memeImage} src={selectedImage.bg} alt="" />
        <div className={s.textBottom}>{textBottom}</div>
      </div>

      <Button onClick={handleSubmit(handleSaveMeme)}>Wyślij</Button>
    </form>
  );
};
