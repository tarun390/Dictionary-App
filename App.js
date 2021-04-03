import React from 'react';
import {
  View,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import HomeScreen from './screens/homeScreen';

export default class App extends React.Component {
  constructor(){
    super()
  }
  render(){
    return(
      <View>
        <HomeScreen />
        <SafeAreaProvider />
      </View>
    );}
  
}
