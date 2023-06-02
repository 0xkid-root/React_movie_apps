import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./Component/MovieComponent";
import axios from "axios";
import MovieInfoComponent from "./Component/MovieInfoComponent";

export const API_KEY = "68c92f6";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const App = () => {
  const [SearchQuery, updateSearchQuery] = useState();
  //  debouncing concept
  const [TimeoutId, updateTimeoutId] = useState();
  const [MovieList, updateMovieList] = useState();

  const [MovieSelected,onMovieSelect]=useState();

  console.log("movie list :", MovieList);

  //  fetch search url api
  const fetchData = async (stringData) => {
    const responce = await axios.get(
      `https://www.omdbapi.com/?s=${stringData}&apikey=${API_KEY}`
    );
    console.log(responce);
    updateMovieList(responce.data.Search);
  };

  // onchange function ----

  const onTextChange = (event) => {
    clearTimeout(TimeoutId);

    updateSearchQuery(event.target.value);

    const timer = setTimeout(() => {
      fetchData(event.target.value);
    }, 500);
    updateTimeoutId(timer);
  };

  return (
    <div>
      <Container>
        <Header>
          <AppName>
            <MovieImage src="movie-icon.svg" />
            react movie app
          </AppName>
          <SearchBox>
            <SearchIcon src="/search-icon.svg" />
            <SearchInput
              Placeholder="movie name"
              value={SearchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
        </Header>
        
        
        {
          MovieSelected  && <MovieInfoComponent  
          MovieSelected={MovieSelected}
          onMovieSelect={onMovieSelect}/>

        }

        <MovieListContainer>
          {MovieList?.length
            ? MovieList.map((movie, index) => (
                <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />
              ))
            : "No Movie List"}
        </MovieListContainer>
      </Container>
    </div>
  );
};

export default App;
