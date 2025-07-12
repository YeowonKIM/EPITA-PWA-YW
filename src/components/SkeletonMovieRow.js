import React from "react";
import "../styles/Row.css"; // 기존 스타일 재사용

const SkeletonMovieRow = ({ isLarge }) => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, idx) => (
        <div
          key={idx}
          className={`skeleton_poster ${isLarge ? "skeleton_large" : ""}`}
        ></div>
      ))}
    </>
  );
};

export default SkeletonMovieRow;
