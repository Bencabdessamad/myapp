import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';
import FormulaireInscription from './FormulaireInscription';
import ListeInscrits from './ListeInscrits';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="FormulaireInscription" component={FormulaireInscription} />
        <Stack.Screen name="ListeInscrits" component={ListeInscrits} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

