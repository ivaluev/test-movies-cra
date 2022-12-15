import {Route, Routes} from 'react-router-dom'
import MovieIndex from './movie-index/MovieIndex'
import MovieInfo from './movie-info/MovieInfo'

const Movies = () => (
  <Routes>
    <Route path="/" element={<MovieIndex />} />
    <Route path="/:id" element={<MovieInfo />} />
  </Routes>
)

export default Movies
