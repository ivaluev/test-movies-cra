import styled from "@emotion/styled"
import React, {ReactNode} from 'react'

interface RootProps {
  className?: string
  children: ReactNode
}

const Root: React.FC<RootProps> = ({children}) => <Wrapper>{children}</Wrapper>

export default Root

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
`
