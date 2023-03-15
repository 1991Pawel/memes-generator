import s from "./MemCard.module.css";
import placeholer from "./img/placeholder.png";

const fakeData = {
  name: "Nazwa użytkownika",
  bgUrl: placeholer,
  id: 1,
  user_id: 2,
};

export const MemCard = () => {
  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <div className={s.avatar}>
          <div className={s.avatarImg}></div>
          <span className={s.name}> {fakeData.name}</span>
        </div>
      </div>
      <img className={s.image} src={placeholer} alt="need alt" />
      <div className={s.cardBottom}>
        <p className={s.desc}>stworzony 2 tygodnie temu</p>
        <div className={s.icons}>
          <div className={s.icon}>ICON</div>
          <div className={s.icon}>ICON</div>
          <div className={s.icon}>ICON</div>
        </div>
      </div>
    </div>
  );
};
