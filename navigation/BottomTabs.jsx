import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function BottomTabs({ books, setBooks }) {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.dark ? '#333' : '#ccc',
                    borderTopWidth: 1,
                    height: 60,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 12,
                    paddingBottom: 4,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                children={(props) => <HomeScreen {...props} books={books} setBooks={setBooks} />}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Adicionar"
                children={(props) => <AddProductScreen {...props} books={books} setBooks={setBooks} />}
                options={{
                    tabBarLabel: 'Adicionar',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

