import React, {useState, useEffect } from "react";
import CardList from "../components/CardList";
import { robots } from "../robots";
import {connect, useDispatch, useSelector} from 'react-redux'
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/Errorboundary";
import SearchBox from "../components/SearchBox";
import "./App.css";

import { setSearchField, requestRobots } from "../actions";

function App({ store }){

  const dispatch = useDispatch() 
  const { searchField } = useSelector(
    state => state.searchRobots
) 


  const { robots, isPending, error } = useSelector(
    state => state.requestRobots
)

 const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value))
  };

  const onRequestRobots = () => {
    dispatch(requestRobots())
  }

  useEffect(() => {
    onRequestRobots() 
  }, [])


    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });
    if (isPending){
      return (
        <h1>loading....</h1>
      )
    }
    if (!error){
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
}

export default App;
