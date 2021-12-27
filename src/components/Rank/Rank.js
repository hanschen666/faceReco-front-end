import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3 center pv0">{`${name}, your current entries is...`}</div>
      <div className="white f2 center">{`${entries}`}</div>
    </div>
  );
};

export default Rank;
