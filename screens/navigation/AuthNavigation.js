import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import ProfileScreen from '../ProfileScreen';
import WorkerHomeScreen from '../WorkerHomeScreen';
import AdminHomeScreen from '../AdminHomeScreen';

// Services
import { ADMIN_EMAIL } from '../../services/firebase';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'

// My Colors
import { colors } from '../../colors/MyColors';


const AuthNavigation = () => {

  const currentUser = useSelector(store => store.currentUser);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='Profile'>

      {currentUser.email === ADMIN_EMAIL ?
        <Tab.Screen name="AdminHome" component={AdminHomeScreen} options={{
          headerTitle: 'User List', headerTitleAlign: 'center', tabBarLabel: () => null, tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesomeIcon icon={faHome} color={colors.theme1.aquamarine} size={25} />
            ) : (
              <FontAwesomeIcon icon={faHome} color={'#505050'} size={25} />
            )
        }} />
        :
        <Tab.Screen name="WorkerHome" component={WorkerHomeScreen} options={{
          headerTitle: 'Task List', headerTitleAlign: 'center', tabBarLabel: () => null, tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesomeIcon icon={faHome} color={colors.theme1.aquamarine} size={25} />
            ) : (
              <FontAwesomeIcon icon={faHome} color={'#505050'} size={25} />
            )
        }} />}

      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        headerTitle: `Welcome ${currentUser.name}`, headerTitleAlign: 'center', tabBarLabel: () => null, tabBarIcon: ({ focused }) =>
          focused ? (
            <FontAwesomeIcon icon={faUser} color={colors.theme1.aquamarine} size={25} />
          ) : (
            <FontAwesomeIcon icon={faUser} color={'#505050'} size={25} />
          )
      }} />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
