import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import MovieIndex from './movies/MovieIndex'
import MovieInfo from './movies/MovieInfo'
import { ApplicationState } from '../store'
import { MoviesState } from '../store/movies/types'

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
const Movies: FC<MoviesState> = () => {
  return (
    <Switch>
      <Route path="/movies" exact>
        <MovieIndex />
      </Route>
      <Route path="/movies/:id">
        <MovieInfo />
      </Route>
    </Switch>
  )
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ movies }: ApplicationState) => ({
  loading: movies.loading,
  errors: movies.errors,
  data: movies.data
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(Movies)
