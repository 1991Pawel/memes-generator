import s from "./MemCard.module.css";
import placeholer from "./img/placeholder.png";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // import locale
import realtiveTime from "dayjs/plugin/relativeTime";
dayjs.locale("pl");
dayjs.extend(realtiveTime);

export const MemCard = ({ mem }: any) => {
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
          <div className={s.icon}>ICON</div>
        </div>
      </div>
    </div>
  );
};
