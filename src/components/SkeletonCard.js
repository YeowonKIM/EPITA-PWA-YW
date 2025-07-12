import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div style={{ width: 200, padding: 10 }}>
      <Skeleton height={300} />  {/* 포스터 */}
      <Skeleton height={20} style={{ marginTop: 10 }} /> {/* 제목 */}
      <Skeleton width={100} height={15} /> {/* 부제 or 장르 */}
    </div>
  );
};

export default SkeletonCard;
