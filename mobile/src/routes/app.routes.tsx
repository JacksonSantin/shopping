import React from 'react';

import Usercad from '../pages/Usercad';
import Landing from '../pages/Landing';
import Establishment from '../pages/Establishment';
import Establishmentform from '../pages/Establishmentform';
import Productsform from '../pages/Productsform';
import Products from '../pages/Products';
import Dashboard from '../pages/Dashboard';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

function AppRoutes() {
  return (
    <Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Landing" component={Landing} />
      <Screen name="Usercad" component={Usercad} />
      <Screen name="Establishment" component={Establishment} />
      <Screen name="Products" component={Products} />
      <Screen name="Establishmentform" component={Establishmentform} />
      <Screen name="Productsform" component={Productsform} />
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}

export default AppRoutes;
