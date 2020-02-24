import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from 'emotion-icons/fa-solid'
import { desaturate } from 'polished'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { Dispatch } from 'redux'
import styled from '../../utils/styled'
import brandColors from '../../styles/colors/brandColors'
import { searchChange } from '../../store/movie-index/actions'
import { MovieIndexActionTypes } from '../../store/movie-index/types'
import { ApplicationState } from '../../store'

type ActionType = {
  type: MovieIndexActionTypes.SEARCH_CHANGED
  payload: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchAPI = (val: string, dsp: Dispatch<any>) => dsp(searchChange(val))
const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 1200)

const colorInactive = desaturate(0.7, brandColors.red)
const colorActive = brandColors.red

export const MovieSearchBox = () => {
  const dispatch = useDispatch()
  const { search } = useSelector((state: ApplicationState) => state.movieIndex)

  const [searchIsActive, setSearchIsActive] = useState(false)
  const [searchLocal, setSearchLocal] = useState(search)
  const onChange = (value: string) => {
    setSearchLocal(value)
    if (value && value.length > 3) {
      searchAPIDebounced(value, dispatch)
    }
  }

  return (
    <SearchContainer style={{ backgroundColor: searchIsActive ? '#e5e5e3' : '' }}>
      <SearchIcon color={searchIsActive ? colorActive : colorInactive} />
      <SearchInput
        type="text"
        placeholder="Search for a movie, tv show, person..."
        value={searchLocal}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setSearchIsActive(true)}
        onBlur={() => setSearchIsActive(false)}
      />
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  /* background-color: whitesmoke; */
`

const SearchIcon = styled(Search)`
  width: 65px;
  height: 25px;
`

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  width: 100%;
  height: 48px;
  padding-left: 5px;
  background-color: transparent;
  &:focus {
    outline-width: 0;
  }
`
