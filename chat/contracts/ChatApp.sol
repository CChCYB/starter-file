// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    //用户状态
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck {
        string name;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //开始编写功能函数,第一个函数检查用户是否存在我们的dapp数据中
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //如果没有用户注册用户
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    //获取用户名和地址
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //添加新朋友
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first"); //检查是否创建了用户
        require(checkUserExists(friend_key), "User is not registered!"); //检查是否注册了
        require(
            msg.sender != friend_key,
            "Users cannot add themeselves as friends"
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "These users are already friends"
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    //检查用户是否已经添加为朋友
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    //添加朋友数据
    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //找到我的朋友
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    //获取聊天代码
    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2)); //计算哈希函数返回公钥地址
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //允许发消息的函数
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "You are not friend with the given user"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key); //得到地址以后更新消息
        message memory newMsg = message(msg.sender, block.timestamp, _msg); //发消息的地址，区块时间戳
        allMessages[chatCode].push(newMsg); //将新的消息压入
    }

    //已读消息
    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key); //得到地址以后更新消息
        return allMessages[chatCode];
    }

    //获取所有已经注册的用户
    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }
}
