import React from 'react'
import styled from '../../utils/styled'

const MovieIndexPager = () => {
  return (
    <PaginationWrapper>
      <Prev>← Previous</Prev>
      <Item>2</Item>
      <Item>3</Item>
      <Item>4</Item>
      <Next>Next →</Next>
    </PaginationWrapper>
  )
}

export default MovieIndexPager

const PaginationWrapper = styled.div`
  text-align: center;
`
