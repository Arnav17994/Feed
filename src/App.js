import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PageComponent from './components/PageComponent';

export default class App extends Component{

    render(){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <PageComponent />
        </View>
      )
    }
}
