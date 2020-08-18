import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AuthContext from './util/AuthContext'

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  const [isLoadingComplete, isLogin, setLogin] = useCachedResources();
  const colorScheme = useColorScheme();

  const authContext = React.useMemo(
    () => {
      return {
        isLogin: isLogin,
        setLogin: (success: boolean) => { setLogin(success) }
      }
    },
    [isLogin, setLogin]
  );

  if (!isLoadingComplete) {
    return null;
  } else {

    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={authContext}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
