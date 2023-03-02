import React, {useState, useEffect } from "react";
import CardList from "../components/CardList";
import { robots } from "../robots";
import {connect, useDispatch, useSelector} from 'react-redux'
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/Errorboundary";
import SearchBox from "../components/SearchBox";
import "./App.css";

import { setSearchField } from "../actions";

function App({ store }){

  const dispatch = useDispatch() 
  const { searchField } = useSelector((state) => state)

  const [robots, setRobots] = useState([])

 const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value))
  };


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      setRobots(users);
    }); 
  }, [])

    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });
    console.log(filteredRobots);
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }

export default App;
