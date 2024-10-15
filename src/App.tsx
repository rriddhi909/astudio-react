import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import './styles/styles.scss';
import AppContextProvider from './contexts/AppContextProvider'; // Path to your provider
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: 'Neutra Text, Arial, sans-serif', // Fallbacks in case Neutra Text is unavailable
  },
  // Optional: customize specific typography variants (e.g., headings, body text)
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Neutra Text, Arial, sans-serif',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensure baseline styling */}
      <AppContextProvider>
        <Router>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
