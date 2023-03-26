import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen'
import AboutBookScreen from './screens/AboutBookScreen'
import SearchScreen from './screens/SearchScreen'
import MyBooksScreen from './screens/MyBooksScreen'
import BookStatusScreen from './screens/BookStatusScreen'
import GenreScreen from './screens/GenreScreen'
import {Provider} from 'react-redux'
import store from './redux/store'

const HomeStack = createNativeStackNavigator();
const MyBooksStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

function HomeStacks () {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{headerShown: false}} name="Home Screen" component={ HomeScreen}/>
      <HomeStack.Screen options={{headerShown: false}} name="Search" component={ SearchScreen }/>
      <HomeStack.Screen options={{headerShown: false}} name="Genre" component={ GenreScreen }/>
      <HomeStack.Screen name="About Book" component={ AboutBookScreen }/>
    </HomeStack.Navigator>
  )
}

function MyBooksStacks () {
  return (

    <MyBooksStack.Navigator>
      <MyBooksStack.Screen options={{headerShown: false}} name="My Books" component={ MyBooksScreen }/>
      <MyBooksStack.Screen options={{headerShown: false}} name="Book Status" component={ BookStatusScreen }/>
      <MyBooksStack.Screen name="About Book" component={ AboutBookScreen }/>
    </MyBooksStack.Navigator>

  )
}


export default class App extends Component {
  state = {
    read: [],
    currently_reading: [],
    want_to_read: [],
    bookshelf: [],
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainTab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'My Books') {
              iconName = focused ? 'ios-book' : 'ios-book-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgb(29, 155, 240)',
          tabBarInactiveTintColor: 'grey',
        })}>
            <MainTab.Screen options={{headerShown: false}} name="Home" component={ HomeStacks }/>
            <MainTab.Screen options={{headerShown: false}} name="My Books" component={ MyBooksStacks }/>
          </MainTab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
