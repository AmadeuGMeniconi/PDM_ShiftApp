import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProfileScreen from '../ProfileScreen';
import WorkerHomeScreen from '../WorkerHomeScreen';
import AdminHomeScreen from '../AdminHomeScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'


const AuthNavigation = () => {

  const currentUser = useSelector(store => store.currentUser);

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator initialRouteName='AdminHome'>

      {currentUser.role === 'ADMIN' ?
        <Tab.Screen name="AdminHome" component={AdminHomeScreen} options={{
          headerTitle: 'USER LIST', headerTitleAlign: 'center', tabBarLabel: () => null, tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesomeIcon icon={faHome} color={'#2196F3'} size={25} />
            ) : (
              <FontAwesomeIcon icon={faHome} color={'#505050'} size={25} />
            )
        }}
        />
        :
        <Tab.Screen name="WorkerHome" component={WorkerHomeScreen} options={{
          headerTitle: 'TASK LIST', headerTitleAlign: 'center', tabBarLabel: () => null, tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesomeIcon icon={faHome} color={'#2196F3'} size={25} />
            ) : (
              <FontAwesomeIcon icon={faHome} color={'#505050'} size={25} />
            )
        }}
        />}

      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        headerTitle: 'PROFILE', headerTitleAlign: 'center', tabBarLabel: () => null, tabBarIcon: ({ focused }) =>
          focused ? (
            <FontAwesomeIcon icon={faUser} color={'#2196F3'} size={25} />
          ) : (
            <FontAwesomeIcon icon={faUser} color={'#505050'} size={25} />
          )
      }}
      />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
