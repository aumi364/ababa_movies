import React from "react";
import style from "./CardStyle.module.css";

type Props = {
  image: string;
  description: string;
  filter?: any;
  name: string;
};

const Card = ({ image, description, filter, name }: Props) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.cardImage}>
        <img src={image} alt="poster" />
      </div>
      <div className={style.cardBody}>
        <div className={style.cardName}>
          <h3>{name}</h3>
        </div>
      </div>
      {/* <div className={style.rating}>{filter.rating}</div> */}
    </div>
  );
};

export default Card;
