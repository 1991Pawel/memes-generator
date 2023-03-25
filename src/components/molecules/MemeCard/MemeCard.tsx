import s from "./MemeCard.module.css";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // import locale
import realtiveTime from "dayjs/plugin/relativeTime";
import { getUserFromSession } from "../../../utils/index";
import { MemeType } from "context/MemesContext";
dayjs.locale("pl");
dayjs.extend(realtiveTime);

interface MemeCard {
  meme: MemeType;
  handleRemoveMeme: (id: string, img_src: string) => void;
}

export const MemCard = ({
  meme,
  handleRemoveMeme: handleRemoveMem,
}: MemeCard) => {
  const user = getUserFromSession();
  const myId = user?.user.id;
  const itsMyPost = myId === meme.user_id;

  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <div className={s.avatar}>
          <div className={s.avatarImg}></div>
          <span className={s.name}> {"placeholder name"}</span>
        </div>
      </div>

      <img className={s.image} src={meme.img_src} alt="need alt" />
      <div className={s.cardBottom}>
        <p className={s.desc}>stworzony {dayjs().to(dayjs(meme.created_at))}</p>
        <div className={s.icons}>
          <div className={s.icon}>ICON</div>
          <div className={s.icon}>ICON</div>
          {itsMyPost && (
            <div
              onClick={() => handleRemoveMem(meme.id, meme.img_src)}
              className={s.icon}
            >
              Delete
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
