import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components'

const ButtonIcon = ({status, accessoryRight, accesoryLeft, text, appearance, callback}) => {
  return (
    <Button style={styles.buttonStyles} 
    status={status} 
    appearance={appearance} 
    accessoryRight={accessoryRight} 
    accesoryLeft={accesoryLeft} 
    onPress={callback}
    >
      {text}
    </Button>
  )
}

export default ButtonIcon;

const styles = StyleSheet.create({
  buttonStyles: {
    margin: 20,
    width: '80%'
  }
});