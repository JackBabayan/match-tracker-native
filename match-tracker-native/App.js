import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import store from './src/store/store';
import queryClient from './src/store/queryClient';

import Header from './src/components/Header';
import MatchTracker from './src/screens/MatchTracker';

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <Header />
          <MatchTracker />
        </View>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 42,
    backgroundColor:'#090909',
    width:'100%',
    height:'100%',
    overflow:'scroll'
  },
});