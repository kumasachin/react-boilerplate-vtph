import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { apolloClient } from './graphql/client';
import { theme } from './styles/theme';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { TodosPage } from './pages/TodosPage';
import { LaunchesPage } from './pages/LaunchesPage';
import { AboutPage } from './pages/AboutPage';
import GlobalStyles from './styles/GlobalStyles.ts';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="/launches" element={<LaunchesPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
