import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Battery from "expo-battery";
import React, { useEffect, useState } from "react";
import { Text, Layout } from "@ui-kitten/components";

import ItemStatus from "./ItemStatus";

import { useBatteryStore } from '../providers/BatteryStore'
import { useNetStore } from '../providers/NetStore'

import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const Header = () => {

  const isAvailable = useBatteryStore((state) => state.isAvailable);
  const setIsAvailable = useBatteryStore((state) => state.setAvailable);
  const batteryLevel = useBatteryStore((state) => state.batteryLevel);
  const setBatteryLevel = useBatteryStore((state) => state.setBatteryLevel);
  const batteryState = useBatteryStore((state) => state.batteryState);
  const setBatteryState = useBatteryStore((state) => state.setBatteryState);
  const batteryStateDescription = useBatteryStore((state) => state.batteryStateDescription);
  const batteryIcon = useBatteryStore((state) => state.batteryIcon);


  const setIsConnected = useNetStore((state) => state.setIsConnected);
  const netIcon = useNetStore((state) => state.netIcon);
  const netStatus = useNetStore((state) => state.networkStatus);
 


  useEffect(() => {
    
    (async () => {
      const [isAvailable, batteryLevel, batteryState, lowPowerMode] =
        await Promise.all([
          Battery.isAvailableAsync(),
          Battery.getBatteryLevelAsync(),
          Battery.getBatteryStateAsync(),
          Battery.isLowPowerModeEnabledAsync(),
        ]);

      setIsAvailable(isAvailable);
      setBatteryLevel((batteryLevel * 100).toFixed(0));
      setBatteryState(batteryState);
      setIsConnected(NetInfo.isConnected)
    })();
    
    const networkListener = NetInfo.addEventListener(state => {
     setIsConnected(state.isConnected)
    });

    const batteryLevelListener = Battery.addBatteryLevelListener(
      ({ batteryLevel }) => {
        setBatteryLevel((batteryLevel * 100).toFixed(0))
      }
    );
    const batteryStateListener = Battery.addBatteryStateListener(
      ({ batteryState }) => {
        setBatteryState(batteryState)
      }
    );
    const lowPowerModeListener = Battery.addLowPowerModeListener(
      ({ lowPowerMode }) => setLowPowerMode(lowPowerMode)
    );
    
    return () => {
      networkListener
      batteryLevelListener /*&& batteryLevelListener.remove();*/
      batteryStateListener /*&& batteryStateListener.remove();*/
      lowPowerModeListener /*&& lowPowerModeListener.remove();*/
    };
  }, []);



  return (
    <Layout
      style={[
        styles.header,
        { backgroundColor: "white", flex: 1, width: "100%" },
      ]}
    >
      <Layout style={styles.header}>
        <Text style={styles.title}>Sumadi Test App</Text>
       <ItemStatus icon={batteryIcon} value={batteryLevel + "% "} status={batteryStateDescription}/>
      {/* <ItemStatus icon={netInfo.isConnected ? 'checkmark-circle-outline': 'close-circle-outline'} status={netInfo.isConnected ? 'CONNECTED': 'DISCONNECTED'}/> */}
      <ItemStatus icon={netIcon} status={netStatus}/>
      </Layout>
    </Layout>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "rgba(0,190,240,1)",
    width: "100%",
    justifyContent: "center",
    borderBottomRightRadius: 120,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    margin: 15,
  },
  batteryInfo: {
    flexDirection: "row",
  },
  batteryText: {
    color: 'white',
    fontWeight: "bold"
  },
  textInfo: {
    display: 'flex',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginLeft: 10
  },
  containerBattery: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 5
  }
});
