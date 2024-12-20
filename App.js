import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Updated HomeStack to hide the header on HomeScreen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} // Hide the header for HomeScreen
      />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#aac27e', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
          tabBarStyle: styles.tabBar, // Custom tab bar styles
          headerShown: false, // Hide headers for all tabs
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingBottom: 10, // Space below tab icons
  },
});
