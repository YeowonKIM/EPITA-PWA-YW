import { useLocation, useParams } from "react-router-dom";
import "../styles/MovieDetailsPage.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Comment from "../components/Comment";
import CommentBox from "../components/CommentBox";
import { mockComments } from "../constants/commentsData";

const MovieDetailsPage = () => {
  const location = useLocation();

  // const [comments, setComments] = useState([]);

  console.log(mockComments.length)
  return (
    <div className="movie-page">
      <Navbar />
      <Banner selectedMovie={location.state.movie}/>
      <div className="comment-section">
        <h2 className="reviews">Comments & Reviews</h2>
        <div className="movie-page-bottom">
          <div className="comments">
            {mockComments.length === 0 ? (
              <div className="no-comments-message">
                <span>No Comments</span>
              </div>
            ) : (
              mockComments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))
            )}
          </div>
          <CommentBox />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
