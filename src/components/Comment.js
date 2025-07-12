import React from 'react'
import "../styles/Comment.css";

const Comment = ({comment}) => {
  let rating = [];

  const displayRating = () => {
    for (let i = 1; i <= 5; i++){
      if(i <= comment.rating) {
        rating.push(
          <span key={i} className='red-star'>
            &#9733;
          </span>
        )
      } else {
        rating.push(
          <span key={i} className='star'>
            &#9734;
          </span>
        )
      }
    }
  }

  return (
    <div className='comment'>
      <div className='comment-box'>
        <div className='comment-title'>{comment.comment}</div>
        <div className='comment-text'>{comment.comment}</div>
        <div className='comment-footer'>
          <div className='comment-info'>
            <span className='comment-author'>
              <span>{comment.username}</span>
            </span>
            <span className='comment-date'>
              {new Date(comment.createdAt).toUTCString()}
            </span>
          </div>
          <div className='comment-rating'>{displayRating()}</div>
        </div>
      </div>

    </div>
  )
}

export default Comment
