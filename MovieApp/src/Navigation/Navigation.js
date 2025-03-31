import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import  Home from '../Screens/Home'
import MovieDetails from '../Screens/MovieDetails'
import RecentHistroy from '../Screens/RecentHistroy'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator()

const Drawercontainer = createDrawerNavigator ()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawercontainer.Navigator initialRouteName="Home"  screenOptions={{
          drawerPosition: 'right', 
          drawerStyle: {
            backgroundColor: '#000', 
            width: 250,
          },
          drawerActiveTintColor: 'white', 
          drawerInactiveTintColor: '#ddd', 
        }}>
        <Drawercontainer.Screen  name="Home" component={Home}  options={{ headerShown: false }}/>
          <Drawercontainer.Screen  name="Recent Histroy"  component={RecentHistroy} options={{ headerShown: false }}/>
          <Drawercontainer.Screen  name="Movie Details"component={MovieDetails}  options={{ headerShown: false }}/>
          </Drawercontainer.Navigator>
    </NavigationContainer>
  )
}
export default Navigation