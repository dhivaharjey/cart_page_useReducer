import React, { memo } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        return (
          <span
            key={i}
            onClick={() => onClick(i)}
            style={{ cursor: "pointer" }}
          >
            {rating > i ? (
              <AiFillStar size="15px" />
            ) : (
              <AiOutlineStar size="15px" />
            )}
          </span>
        );
      })}
    </>
  );
};

export default memo(Rating);
