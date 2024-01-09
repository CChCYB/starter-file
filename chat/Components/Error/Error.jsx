import React from "react";

//INTERNAL IMPORT
import Style from "./Error.module.css";

const Error = ({ error }) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>请修复此错误并重新加载浏览器</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;
