import React from 'react';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../HomeScreen'
// import Profile from '../screens/Profile';


const AuthNavigation = () => {

  const Tab = createBottomTabNavigator();


  return (
    <Tab.Navigator initialRouteName="Home">
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
