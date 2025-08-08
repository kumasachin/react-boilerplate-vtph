import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navigation } from './components/Navigation';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { Version } from './components/Version';
import { apolloClient } from './graphql/client';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { LaunchesPage } from './pages/LaunchesPage';
import { TodosPage } from './pages/TodosPage';
import GlobalStyles from './styles/GlobalStyles.ts';
import { theme } from './styles/theme';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PerformanceMonitor />
        <Router>
          <div className="App">
            <Navigation />
            <main>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/todos" element={<TodosPage />} />
                  <Route path="/launches" element={<LaunchesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Version />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
