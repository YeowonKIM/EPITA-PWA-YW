import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi } from "../constants/axios";
import { movieRequests } from "../constants/requests";

const initialState = {
  movies: {
    "Top Rated": [],
    Trending: [],
    Comedy: [],
    Horror: [],
    Documentaries: [],
    "Netflix Originals": [],
  },
  status: "idle",
  error: null,
};

export const getMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    // return Promise.reject("Cannot get movies")
    const response = await movieApi.get(movieRequests.fetchAllMovies, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    });
    // throw new Error('test')
    return response.data;
  } catch (error) {
    return error.response.data.error
  }
});

const movieSlice = createSlice({
  /** the name of the slice will also be used as the actoin type string
   * in combination with the extraReducer name i.e. posts/getPosts or posts/addPost
   */
  name: "movies",
  initialState,
  // add reducers for the sync on the UI
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload.movies;
      state.status = "success";
    })
    .addCase(getMovies.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });
  },
});

export default movieSlice.reducer

export const selectAllMovies = (state) => state.movies.movies
export const getMoviesStatus = (state) => state.movies.status
export const getMoviesError = (state) => state.movies.error