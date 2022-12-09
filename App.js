import React, { useEffect } from 'react';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Services
import { initCheckAuthState, initFirebase } from './services/firebase';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Screens
import Login from './screens/LoginScreen';
import AuthNavigation from './screens/navigation/AuthNavigation';

const App = () => {

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    console.log('# --------- APP MOUNTED --------- #');
    initFirebase();
    initCheckAuthState();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthNavigation} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;