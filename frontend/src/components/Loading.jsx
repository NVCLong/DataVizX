import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = (isLoadingPage, delayTime) => {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <HashLoader
        color="#b700ff"
        loading={isLoadingPage}
        delay={delayTime}
        cssOverride={{}}
        speedMultiplier={2}
        size={100}
      />
    </div>
  );
};

export default Loading;
