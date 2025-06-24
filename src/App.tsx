import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { COLORS } from './constants';
import EditorScreen from './screens/EditorScreen';
import { EditorProvider } from './contexts/EditorContext';

const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <EditorProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
          <EditorScreen />
        </SafeAreaProvider>
      </EditorProvider>
    </GestureHandlerRootView>
  );
};

export default App;
