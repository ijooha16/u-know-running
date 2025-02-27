import { Fragment } from "react";

const TabBar = ({ tabs, onClick }) => {
  //  const tabs = ["탭 1", "탭 2"] 이런식으로 보내주시면 됩니다.

  return (
    <div>
      {tabs.map((tab, idx) => {
        return (
          <Fragment key={tab}>
            <button onClick={() => onClick(tab)}>{tab}</button>
            {idx < tabs.length - 1 && <span className="mx-2 text-gray-400"> | </span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default TabBar;
