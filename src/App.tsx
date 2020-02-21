import React from 'react'
import { History } from 'history'
import { ThemeProvider } from 'emotion-theming'
import AppRoutes from './AppRoutes'
import lightTheme from './styles/themes/light'

interface AppProps {
  history: History
}

const App: React.FC<AppProps> = ({ history }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
