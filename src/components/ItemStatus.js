import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ItemStatus = ({icon, value, status}) => {

  return (
    <Layout style={styles.textInfo}>
        <Layout style={styles.containerBattery}>
          <Ionicons name={icon} size={28} color="white" />
        </Layout>
        <Layout style={styles.containerBattery}>
          <Text style={styles.batteryText}>
            {value}{status}
          </Text>
        </Layout>
      </Layout>
  )
}

export default ItemStatus;

const styles = StyleSheet.create({
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
  