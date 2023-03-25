import s from "./MemCard.module.css";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // import locale
import realtiveTime from "dayjs/plugin/relativeTime";
import { getUserFromSession } from "../../../utils/index";
import { MemType } from "context/MemsContext";
dayjs.locale("pl");
dayjs.extend(realtiveTime);

interface MemCardType {
  mem: MemType;
  handleRemoveMem: (id: string, img_src: string) => void;
}

export const MemCard = ({ mem, handleRemoveMem }: MemCardType) => {
  const user = getUserFromSession();
  const myId = user?.user.id;
  const itsMyPost = myId === mem.user_id;

  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <div className={s.avatar}>
          <div className={s.avatarImg}></div>
          <span className={s.name}> {"placeholder name"}</span>
        </div>
      </div>

      <img className={s.image} src={mem.img_src} alt="need alt" />
      <div className={s.cardBottom}>
        <p className={s.desc}>stworzony {dayjs().to(dayjs(mem.created_at))}</p>
        <div className={s.icons}>
          <div className={s.icon}>ICON</div>
          <div className={s.icon}>ICON</div>
          {itsMyPost && (
            <div
              onClick={() => handleRemoveMem(mem.id, mem.img_src)}
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
