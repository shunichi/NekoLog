/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import base64 from 'base-64';

const catImages = [
  require('./images/wancha.jpg'),
  require('./images/nori.jpg'),
];

class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {id: this.props.id, name: this.props.name};
  }

  render() {
    let cat = this.state
    return (
      <View>
        <Image source={catImages[cat.id % catImages.length]} style={{width: 120, height: 120}} />
        <Text>{cat.name}</Text>
      </View>
    );
  }
}

export default class NekoLog extends Component {
  constructor(props){
    super(props);
    this.state = {text: '', cats: []};
  }

  componentDidMount() {
    this.fetchCats();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.cats.map((cat,_) =>
          <Cat key={cat.id} id={cat.id} name={cat.name} />
        )}
      </View>
    );
  }

  fetchCats() {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("user:pass"));
    fetch('https://neko-log.herokuapp.com/cats.json', {headers: headers})
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({cats: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NekoLog', () => NekoLog);
