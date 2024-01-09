import React from "react";
import Image from "next/image";

//内部导入
import Style from "./UserCard.module.css";
import images from "../../assets";
const UserCard = ({ el, i, addFriends }) => {
  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image
          className={Style.UserCard_box_img}
          src={images[`image${i + 1}`]}
          alt="user"
          width={100}
          height={100}
        />

        <div className={Style.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0, 25)}..</p>
          <button
            onClick={() =>
              addFriends({ name: el.name, userAddress: el.accountAddress })
            }
          >
            添加朋友
          </button>
        </div>
      </div>

      <small className={Style.number}>{i + 1}</small>
    </div>
  );
};

export default UserCard;
