import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Page from '../../layout/Page'
import Container from '../../layout/Container'
import DataTable from '../../components/DataTable'
import styled from '../../utils/styled'
import { Loading } from '../../layout/Loading'
import { API_ENDPOINT } from '../../utils/api'
import { MoviesState } from '../../store/movies/types'
import { fetchRequest } from '../../store/movies/actions'
import { ApplicationState } from '../../store'

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = MoviesState & PropsFromDispatch

const MovieIndex = ({ loading, data, fetchRequest: fr }: AllProps) => {
  useEffect(() => {
    fr()
  }, [])

  function renderData() {
    return (
      <DataTable columns={['Movie', 'Pro Picks/Bans*', 'Pro Wins']} widths={['auto', '', '']}>
        {loading && data.length === 0 && (
          <MovieLoading>
            <td colSpan={3}>Loading...</td>
          </MovieLoading>
        )}
        {data.map(movie => (
          <tr key={movie.id}>
            <MovieDetail>
              <MovieIcon src={`${API_ENDPOINT}${movie.icon}`} alt={movie.name} />
              <MovieName>
                <Link to={`/movies/${movie.name}`}>{movie.localized_name}</Link>
              </MovieName>
            </MovieDetail>
            <td>
              {movie.pro_pick || 0} / {movie.pro_ban || 0}
            </td>
            <td>{movie.pro_win || 0}</td>
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
          <p>MovieIndex Page</p>
          {/* <Link to="/movies/2">aslals</Link> */}
          {renderData()}
        </TableWrapper>
      </Container>
    </Page>
  )
}

const mapStateToProps = ({ movies }: ApplicationState) => ({
  loading: movies.loading,
  data: movies.data,
  errors: movies.errors
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieIndex)

const MovieLoading = styled.tr`
  td {
    height: 48px;
    text-align: center;
  }
`

const TableWrapper = styled.div`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`

const MovieDetail = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MovieIcon = styled('img')`
  width: 32px;
  height: 32px;
`
const MovieName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`
