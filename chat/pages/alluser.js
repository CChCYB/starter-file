import React, { useState, useEffect, useContext } from "react";
//内部导入
import { UserCard } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContect } from "../Context/ChatAppContext";

const alluser = () => {
  const { userLists, addFriends } = useContext(ChatAppContect);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>寻找你的朋友 </h1>
      </div>

      <div className={Style.alluser}>
        {userLists.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default alluser;
