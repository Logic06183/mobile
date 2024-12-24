import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import DashboardScreen from './src/screens/DashboardScreen';
import KitchenScreen from './src/screens/KitchenScreen';

const Stack = createNativeStackNavigator();

// Custom theme based on John Dough's branding
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FFD700', // Yellow for brand
    secondary: '#1F2937', // Dark blue-gray
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    background: '#F3F4F6',
    surface: '#FFFFFF',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.secondary,
          }}
        >
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{
              title: "John Dough's",
            }}
          />
          <Stack.Screen 
            name="Kitchen" 
            component={KitchenScreen}
            options={{
              title: "Kitchen Display",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
