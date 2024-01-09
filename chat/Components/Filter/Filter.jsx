import React, { useState, useContext } from "react";
import Image from "next/image";

//内部导入
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model } from "../index";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContect);

  //用户状态
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input type="text" placeholder="搜索用户.." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            清理聊天
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            添加朋友
          </button>
        </div>
      </div>

      {/* //MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="欢迎来到"
            head="CHAT BUDDY"
            info="在这里，你可以与全球各地的用户实时互动，并且不需要担心中心服务器。开始你的去中心化聊天之旅，保护你的隐私，享受自由的通信体验吧！"
            smallInfo="请选择你的名字和钱包地址.."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
