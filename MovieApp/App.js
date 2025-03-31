import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Navigation from './src/Navigation/Navigation';
import 'react-native-gesture-handler';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssloading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ssloading: false });
    }, 3000);
  }

  render() {
    const { ssloading } = this.state;
    return ssloading ? (
      <View style={{ flex: 1 }}>
        <Image source={require("./src/Assest/splash.png")} style={{ height: '100%', width: '100%' }} />
      </View>
    ) : (
      <Navigation />
    );
  }
}

export default App;
