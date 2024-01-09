import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//内部导入
import Style from "./NavBar.module.css";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "所有用户",
      link: "alluser",
    },
    {
      menu: "聊天",
      link: "/",
    }
  ];

  //用户状态
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } =
    useContext(ChatAppContect);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* //DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* //MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}

              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* CONNECT WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>连接钱包</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "创建用户"}</small>
              </button>
            )}
          </div>

          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="欢迎来到"
            head="CHAT BUDDY"
            info="在这里，你可以与全球各地的用户实时互动，并且不需要担心中心服务器。开始你的去中心化聊天之旅，保护你的隐私，享受自由的通信体验吧！"
            smallInfo="现在请选择你的名字吧..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default NavBar;
