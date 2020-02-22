import React, { useState } from 'react'
import { Switch, Route } from 'react-router'
import MovieIndex from './movies/MovieIndex'
import MovieInfo from './movies/MovieInfo'
import { Movie } from './movies/_types'

const Movies = () => {
  // do we want to maintain a state here?
  const [data, setData] = useState<Movie[]>([])
  const getMovie = (id: string | undefined) => data.find(m => m.name === id)

  return (
    <Switch>
      <Route path="/movies" exact>
        <MovieIndex data={data} setData={setData} />
      </Route>
      <Route path="/movies/:id">
        <MovieInfo getMovie={getMovie} />
      </Route>
    </Switch>
  )
}

export default Movies
