import React from 'react';

import Usercad from '../pages/Usercad';
import Landing from '../pages/Landing';
import Establishment from '../pages/Establishment';
import Establishmentform from '../pages/Establishmentform';
import Productsform from '../pages/Productsform';
import Products from '../pages/Products';
import Dashboard from '../pages/Dashboard';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/PageHeader';

const { Navigator, Screen } = createStackNavigator();

function AppRoutes() {
  return (
    <Navigator screenOptions={{ cardStyle: { backgroundColor: '#f2f3f5' } }}>
      <Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="Usercad"
        component={Usercad}
        options={{
          header: () => <Header title="Cadastro de usuário" />
        }}
      />
      <Screen
        name="Establishment"
        component={Establishment}
        options={{
          header: () => <Header title="Lista de estabelecimentos" />
        }}
      />
      <Screen
        name="Products"
        component={Products}
        options={{
          header: () => <Header title="Lista de produtos" />
        }}
      />
      <Screen
        name="Establishmentform"
        component={Establishmentform}
        options={{
          header: () => <Header title="Cadastro de estabelecimento" />
        }}
      />
      <Screen
        name="Productsform"
        component={Productsform}
        options={{
          header: () => <Header title="Cadastro de produtos" />
        }}
      />
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          header: () => <Header title="relatórios" />
        }}
      />
    </Navigator>
  );
}

export default AppRoutes;
