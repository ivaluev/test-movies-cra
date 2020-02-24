import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Page from '../../layout/Page'
import Container from '../../layout/Container'
import DataTable from '../../components/DataTable'
import { Loading } from '../../layout/Loading'
import { API_ENDPOINT_IMAGE } from '../../utils/api'
import { ApplicationState } from '../../store'
import { MovieIndexItem } from '../../store/movie-index/types'
import { MovieLoading, MovieIndexDetail, MovieIcon, TableWrapper, MovieName } from './MovieIndexDetail'
import { fetchSearchRequest } from '../../store/movie-index/actions'
import { MovieSearchBox } from './MovieSearchBox'

type MovieIndexProps = {
  loading: boolean
  page?: number
  pagesTotal?: number
  items?: MovieIndexItem[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchSearchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = MovieIndexProps & PropsFromDispatch

const MovieIndex = ({ loading, items = [], fetchRequest }: AllProps) => {
  useEffect(() => {
    fetchRequest('Jack Reacher')
  }, [])

  function renderData() {
    return (
      <DataTable columns={['Movie', 'Release Date', 'Popularity']} widths={['auto', '', '']}>
        {loading && items.length === 0 && (
          <MovieLoading>
            <td colSpan={3}>Loading...</td>
          </MovieLoading>
        )}
        {items.map(movie => (
          <tr key={movie.id}>
            <MovieIndexDetail>
              <MovieIcon src={`${API_ENDPOINT_IMAGE}/w500${movie.poster_path}`} alt={movie.title} />
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
      </Container>
    </Page>
  )
}

const mapStateToProps = ({ movieIndex }: ApplicationState) => ({
  loading: movieIndex.loading,
  page: movieIndex.data?.page,
  pagesTotal: movieIndex.data?.total_pages,
  items: movieIndex.data?.results,
  errors: movieIndex.errors
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest: fetchSearchRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieIndex)
