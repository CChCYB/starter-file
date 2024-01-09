import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

//内部导入
import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContect = React.createContext();

export const ChatAppProvider = ({ children }) => {
  //用户状态
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //用户状态数据
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  //获取页面加载的数据时间
  const fetchData = async () => {
    try {
      //获得合同
      const contract = await connectingWithContract();
      //获取帐户
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //获取用户名
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      //获取我的好友列表
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      //获取所有应用程序用户列表
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //阅读留言
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log("请输入你要发送的信息");
    }
  };

  //创建账户
  const createAccount = async ({ name }) => {
    console.log(name, account);
    try {
      if (!name || !account)
        return setError("姓名和账户地址不能为空");

      const contract = await connectingWithContract();
      console.log(contract);
      const getCreatedUser = await contract.createAccount(name);

      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("创建帐户时出错 请重新加载浏览器");
    }
  };

  //添加你的朋友
  const addFriends = async ({ name, userAddress }) => {
    try {
      if (!name || !userAddress) return setError("请提供数据");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(userAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("添加好友时出错，请重试");
    }
  };

  //发送消息给您的朋友
  const sendMessage = async ({ msg, address }) => {
    console.log(msg, address);
    try {
      if (!msg || !address) return setError("请输入您的留言");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
    } catch (error) {
      setError("请重新加载并重试");
    }
  };

  //阅读信息
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };
  return (
    <ChatAppContect.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        ChechIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContect.Provider>
  );
};
