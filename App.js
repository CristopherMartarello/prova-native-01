import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import BottomTabs from './navigation/BottomTabs';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function Main() {
  const { theme } = useThemeContext();
  const [books, setBooks] = useState([]);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NativeBaseProvider>
          <NavigationContainer theme={theme}>
            <BottomTabs books={books} setBooks={setBooks} />
          </NavigationContainer>
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
