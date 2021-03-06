import { Ionicons, Fontisto } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
// @ts-ignore
import Token from '../util/Token'
import {Dispatch, SetStateAction} from "react";

export default function useCachedResources(): [boolean, boolean, Dispatch<SetStateAction<boolean>>] {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isLogin, setLogin] = React.useState(false);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...Fontisto.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        const token = await Token.getUserToken()
        setLogin(!!token);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return [isLoadingComplete, isLogin, setLogin];
}
