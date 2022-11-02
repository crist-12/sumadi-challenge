import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  AppState,
} from "react-native";
import * as eva from "@eva-design/eva";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { navigatePush } from "./src/utils/Navigation";

import HomeScreen from "./src/screens/HomeScreen";
import DisplayScreen from "./src/screens/DisplayScreen";
import PictureScreen from "./src/screens/PictureScreen";

import Header from "./src/components/Header";


const Stack = createStackNavigator();
export const navigateRef = createNavigationContainerRef();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return;
        }
      });

  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
    }
  );

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
      navigatePush('Home')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
 

  /*const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "We miss you :c",
        body: "Please come back",
      },

      trigger: null,
    });
  };*/

  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = async (nextAppState) => {
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
      } else {
     await sendPushNotification()
      }
      setAppState(nextAppState);
    }
  };

  async function sendPushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "We miss you. :c",
        body: 'Please come back',
        vibrate: false,
      },
      trigger: { seconds: 1 },
    });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer ref={navigateRef}>
          <KeyboardAvoidingView
            style={styles.general}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-50}
          >
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <Header />
            </View>
            <View style={styles.body}>
              <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Display"
                  component={DisplayScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Picture"
                  component={PictureScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </View>
          </KeyboardAvoidingView>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  general: {
    flex: 1,
    backgroundColor: "rgba(0,190,240,1)",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 4,
    width: "100%",
    borderTopLeftRadius: 120,
  },
});
