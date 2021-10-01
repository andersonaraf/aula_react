import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Task from "./src/pages/Task/";
import Details from "./src/pages/Details/";
import NewTask from "./src/pages/NewTask/";
import Delivery  from "./src/pages/Delivey"

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Task">
          <Stack.Screen name="Produtos" component={Task} options={{headerTintColor:"#f92"}}/>
          <Stack.Screen name="Novo Produto" component={NewTask} options={{headerTintColor:"#f92"}}/>
          <Stack.Screen name="Detalhes Do Produto" component={Details} options={{headerTintColor:"#f92"}}/>
          <Stack.Screen name="Realizar Entrega" component={Delivery} options={{headerTintColor:"#f92"}}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}