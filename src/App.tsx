import React from 'react';
import RootStackNavigator from './navigation/RootStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App(): React.ReactElement | null {
  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}
