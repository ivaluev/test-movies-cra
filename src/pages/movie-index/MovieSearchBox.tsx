import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Search } from 'emotion-icons/fa-solid'
import { desaturate } from 'polished'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import styled from '../../utils/styled'
import brandColors from '../../styles/colors/brandColors'

const colorInactive = desaturate(0.7, brandColors.red)
const colorActive = brandColors.red

// eslint-disable-next-line no-alert
const searchAPI = (text: string) => alert(text)
const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 1500)

export const MovieSearchBox = () => {
  const [searchIsActive, setSearchIsActive] = useState(false)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const onChange = (value: string) => {
    setSearch(value)
    if (value && value.length > 3) {
      searchAPIDebounced(value)
    }
  }

  return (
    <SearchContainer style={{ backgroundColor: searchIsActive ? '#e5e5e3' : '' }}>
      <SearchIcon color={searchIsActive ? colorActive : colorInactive} />
      <SearchInput
        type="text"
        placeholder="Search for a movie, tv show, person..."
        value={search}
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
