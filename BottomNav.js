import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import Home from './App';
// import Volcano from './Volcano';
import Editvolcano from './Editvolcano';
import QandA from './Questionanswer';

function HomeScreen() {
    return (
      <Home />
    );
  }
  
  /* function DataVolcanoScreen() {
    return (
      <Volcano />
    );
} */


function MapScreen() {
  return (
    <WebView 
    source={{ uri: 'https://leafletmap-ashen.vercel.app/home' }} 
    />
  );
}

function EditVolcanoScreen() {
  return (
    <Editvolcano />
  );
}

function QandAScreen() {
  return (
    <QandA/>
  );
}

  
  
const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator
  screenOptions={{
    tabBarStyle: {
      position: 'absolute', // Membuat tab bar melayang
      backgroundColor: '#7c7074', // Warna coklat
      marginHorizontal: 20, // Memberikan margin kiri dan kanan
      marginBottom: 10, // Jarak dari bawah layar
      borderRadius: 15, // Membuat sudut membulat
      height: 60, // Tinggi tab bar
      shadowColor: '#000', // Shadow untuk efek melayang
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5, // Shadow di Android
    },
    tabBarActiveTintColor: '#a7b92f', // Warna ikon dan teks aktif biru
    tabBarInactiveTintColor: '#ccc', // Warna ikon dan teks tidak aktif
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcon icon={faHome} color={color} size={20} />
      ),
    }}
  />
  {/* <Tab.Screen
    name="Data M"
    component={DataVolcanoScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcon icon={faList} color={color} size={20} />
      ),
    }}
  /> */}
  
  <Tab.Screen
    name="Data"
    component={EditVolcanoScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcon icon={faList} color={color} size={20} />
      ),
    }}
    />

  <Tab.Screen
    name="Map"
    component={MapScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcon icon={faMap} color={color} size={20} />
      ),
    }}
  />

  <Tab.Screen
    name="Q&A"
    component={QandAScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcon icon={faQuestion} color={color} size={20} />
      ),
    }}
  />
</Tab.Navigator>

      </NavigationContainer>
    );
  }