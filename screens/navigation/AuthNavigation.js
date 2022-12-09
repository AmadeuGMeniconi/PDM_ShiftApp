import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProfileScreen from '../ProfileScreen';
import WorkerHomeScreen from '../WorkerHomeScreen';
import AdminHomeScreen from '../AdminHomeScreen';



const AuthNavigation = () => {

  const currentUser = useSelector(store => store.currentUser);

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator >
      {currentUser.role === 'ADMIN' && <Tab.Screen name="AdminHome" component={AdminHomeScreen} />}
      {currentUser.role === 'WORKER' && <Tab.Screen name="WorkerHome" component={WorkerHomeScreen} />}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
