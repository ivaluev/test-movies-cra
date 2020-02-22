import React from 'react'
import { Switch, Route } from 'react-router'
import MovieIndex from './movies/MovieIndex'
import MovieInfo from './movies/MovieInfo'

const Movies: React.FC = () => {
  return (
    <Switch>
      <Route path="/movies" exact component={MovieIndex} />
      <Route path="/movies/:id" component={MovieInfo} />
    </Switch>
  )
}

export default Movies
