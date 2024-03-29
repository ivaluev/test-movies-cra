import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import DataTable from '../../../common/components/controls/DataTable'
import Container from '../../../common/components/layout/Container'
import {Loading} from '../../../common/components/layout/Loading'
import Page from '../../../common/components/layout/Page'
import {API_ENDPOINT_IMAGE} from '../../../common/utils/api'
import {ApplicationState} from '../../../store'
import {MovieIndexItem} from '../../../store/movie-index/types'
import {
  MovieIcon,
  MovieIconPh,
  MovieIndexDetail,
  MovieLoading,
  MovieName,
  TableWrapper,
} from './MovieIndexItem'
import MovieIndexPager from './MovieIndexPager'
import {MovieSearchBox} from './MovieIndexSearch'

type MovieIndexProps = {
  loading: boolean
  results: MovieIndexItem[]
  errors?: string
}

const MovieIndex = ({results, loading}: MovieIndexProps) => {
  function renderData() {
    return (
      <DataTable columns={['Movie', 'Release Date', 'Popularity']} widths={['auto', '', '']}>
        {loading && results.length === 0 && (
          <MovieLoading>
            <td colSpan={3}>Loading...</td>
          </MovieLoading>
        )}
        {results.map(movie => (
          <tr key={movie.id}>
            <MovieIndexDetail>
              {movie.poster_path && (
                <MovieIcon
                  src={`${API_ENDPOINT_IMAGE}/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              {!movie.poster_path && <MovieIconPh />}
              <MovieName>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </MovieName>
            </MovieIndexDetail>
            <td>{movie.release_date}</td>
            <td>{movie.popularity || 0}</td>
          </tr>
        ))}
      </DataTable>
    )
  }

  return (
    <Page>
      <Container>
        <TableWrapper>
          <Loading loading={loading} />
          <MovieSearchBox />
          {/* <Link to="/movies/2">aslals</Link> */}
          {renderData()}
        </TableWrapper>
        <MovieIndexPager />
      </Container>
    </Page>
  )
}

const mapStateToProps = ({movieIndex}: ApplicationState) => ({
  loading: movieIndex.loading,
  results: movieIndex.results || [],
  errors: movieIndex.errors,
})

export default connect(mapStateToProps)(MovieIndex)
