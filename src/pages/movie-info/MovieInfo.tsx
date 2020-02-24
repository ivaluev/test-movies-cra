import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from '../../layout/Container'
import Page from '../../layout/Page'
import styled from '../../utils/styled'
import {
  MovieInfobox,
  MovieInfoboxBlurBackground,
  MovieInfoboxInner,
  MovieInfoboxImage,
  MovieInfoboxHeading,
  MovieName,
  MovieRoles
} from './MovieInfoHeader'
import { API_ENDPOINT } from '../../utils/api'
import { MovieStatsInner, MovieStats, StatAttribute, Bullet } from './MovieInfoStats'
import { MovieDetails, MovieDetailsColumn, MovieDetailsRow, MovieDetailsAttrName } from './MovieInfoDetails'
import { Loading } from '../../layout/Loading'
import { ApplicationState } from '../../store'
import { fetchInfoRequest } from '../../store/movie-info/actions'
import { MovieInfoState } from '../../store/movie-info/types'

// We can use `typeof` here to map our dispatch types to the props, like so.
type PropsFromDispatch = {
  fetchRequest: typeof fetchInfoRequest
}

type AllProps = MovieInfoState & PropsFromDispatch

const MovieInfo = ({ loading, data: movie, fetchRequest }: AllProps) => {
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const idInt: number = parseInt(id, 10)
      fetchRequest(idInt)
    }
  }, [id])

  return (
    <Page>
      <Container>
        <Wrapper>
          <Loading loading={loading} />
          {movie && (
            <>
              <MovieInfobox>
                <MovieInfoboxBlurBackground src={API_ENDPOINT + movie.img} />
                <MovieInfoboxInner>
                  <MovieInfoboxImage src={API_ENDPOINT + movie.img} />
                  <MovieInfoboxHeading>
                    <MovieName>{movie.localized_name}</MovieName>
                    <MovieRoles>
                      {movie.attack_type} - <span>{movie.roles.join(', ')}</span>
                    </MovieRoles>
                  </MovieInfoboxHeading>
                  <MovieStats>
                    <MovieStatsInner>
                      <StatAttribute attr="str" isPrimaryAttr={movie.primary_attr === 'str'}>
                        <Bullet attr="str" /> {movie.base_str || 0} + {movie.str_gain || 0}
                      </StatAttribute>
                      <StatAttribute attr="agi" isPrimaryAttr={movie.primary_attr === 'agi'}>
                        <Bullet attr="agi" /> {movie.base_agi || 0} + {movie.agi_gain || 0}
                      </StatAttribute>
                      <StatAttribute attr="int" isPrimaryAttr={movie.primary_attr === 'int'}>
                        <Bullet attr="int" /> {movie.base_int || 0} + {movie.int_gain || 0}
                      </StatAttribute>
                    </MovieStatsInner>
                  </MovieStats>
                </MovieInfoboxInner>
              </MovieInfobox>
              <MovieDetails>
                <MovieDetailsColumn>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Base Attack:</MovieDetailsAttrName> {movie.base_attack_min} - {movie.base_attack_max}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Attack Range:</MovieDetailsAttrName> {movie.attack_range || '-'}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Attack Speed:</MovieDetailsAttrName> {movie.attack_speed || '-'}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Projectile Speed:</MovieDetailsAttrName> {movie.projectile_speed || '-'}
                  </MovieDetailsRow>
                </MovieDetailsColumn>
                <MovieDetailsColumn>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Health:</MovieDetailsAttrName> {movie.base_health || 0}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Health Regen:</MovieDetailsAttrName> {movie.base_health_regen || 0}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Mana:</MovieDetailsAttrName> {movie.base_mana || 0}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Mana Regen:</MovieDetailsAttrName> {movie.base_mana_regen || 0}
                  </MovieDetailsRow>
                </MovieDetailsColumn>
                <MovieDetailsColumn>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Base Armor:</MovieDetailsAttrName> -
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Magic Resistance:</MovieDetailsAttrName> {movie.base_mr || 0}%
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Move Speed:</MovieDetailsAttrName> {movie.move_speed || 0}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Turn Speed:</MovieDetailsAttrName> {movie.turn_rate || 0}
                  </MovieDetailsRow>
                </MovieDetailsColumn>
                <MovieDetailsColumn>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>Number of Legs:</MovieDetailsAttrName> {movie.legs}
                  </MovieDetailsRow>
                  <MovieDetailsRow>
                    <MovieDetailsAttrName>CM Enabled:</MovieDetailsAttrName> {movie.cm_enabled ? 'yes' : 'no'}
                  </MovieDetailsRow>
                </MovieDetailsColumn>
              </MovieDetails>
            </>
          )}
        </Wrapper>
      </Container>
    </Page>
  )
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ movieInfo }: ApplicationState) => ({
  loading: movieInfo.loading,
  errors: movieInfo.errors,
  data: movieInfo.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest: fetchInfoRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo)

const Wrapper = styled('div')`
  position: relative;
`
