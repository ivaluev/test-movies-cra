import {Route, Routes} from 'react-router-dom'
import MovieIndex from './movie-index/MovieIndex'
import MovieInfo from './movie-info/MovieInfo'

const Movies = () => (
  <Routes>
    <Route path="/movies">
      <MovieIndex />
    </Route>
    <Route path="/movies/:id">
      <MovieInfo />
    </Route>
  </Routes>
)

export default Movies
