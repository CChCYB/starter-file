import React, { useEffect, useState,useRef  } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//内部导入
import Style from "./Chat.module.css";
import images from "../../../assets";
import { converBlockTime, converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  //用户状态
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, []);


  const messageRef = useRef(message);

  useEffect(() => {
    // 监听 message 的变化
    messageRef.current = message;
  }, [message]);

  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [friendMsg]);

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div>
                {el.sender == chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} {""}
                      <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {userName} {""}
                      <small>Time: {converTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msg}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                placeholder="请输入你要发送的信息"
                onChange={(e) => setMessage(e.target.value)}
                value={message} 
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={async (e) => {
                    try {
                      await functionName({ msg: message, address: chatData.address });
                      setTimeout(() => {
                        setMessage('');
                      }, 0);// 智能合约调用成功后清空输入框
                    } catch (error) {
                      console.error('Error calling functionName:', error);
                      // 处理错误，如果需要的话
                    }
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
