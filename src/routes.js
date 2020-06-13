import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { BackButton } from '~/global/styles';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function New({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerLeft: () => (
          <BackButton
            onPress={() => {
              if (!route.state) {
                navigation.goBack();
              } else if (route.state.index === 0) {
                navigation.navigate('Dashboard');
              } else if (route.state.index === 1) {
                navigation.navigate('SelectProvider');
              } else {
                navigation.navigate('SelectDateTime');
              }
            }}
          >
            <Icon name="chevron-left" size={20} color="#fff" />
          </BackButton>
        ),
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        options={{
          headerTitle: 'Selecione o prestador',
          headerTitleAlign: 'center',
        }}
        component={SelectProvider}
      />
      <Stack.Screen
        name="SelectDateTime"
        options={{
          headerTitle: 'Selecione o horário',
          headerTitleAlign: 'center',
        }}
        component={SelectDateTime}
      />
      <Stack.Screen
        name="Confirm"
        options={{
          headerTitle: 'Confirmar agendamento',
          headerTitleAlign: 'center',
        }}
        component={Confirm}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        activeBackgroundColor: '#8d41a8',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        inactiveBackgroundColor: '#8d41a8',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color }) => (
            <Icon name="event" size={20} color={color} />
          ),
        }}
      />
      {/*= ============ AQUI =================== */}
      <Tab.Screen
        name="New"
        component={New}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Agendar',
          tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Sign() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default function Routes({ signed }) {
  const initial = signed ? 'App' : 'Sign';

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={initial}>
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

New.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape().isRequired,
};
