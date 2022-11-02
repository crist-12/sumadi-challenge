
import React from 'react'
import { StyleSheet } from 'react-native';
import { Layout, Button, Icon } from '@ui-kitten/components'

import ButtonIcon from '../components/ButtonIcon';
import { usePictureStore } from '../providers/PictureStore';


const cameraIcon = (props) => (
  <Icon {...props} name='camera-outline' />
);

const galleryIcon = (props) => (
  <Icon {...props} name='image-outline'/>
);


const HomeScreen = ({navigation}) => {

  const pickImage = usePictureStore((state) => state.pickImage);

  return (
    <Layout style={styles.general}>
      <Layout style={styles.body}>
          <Layout style={styles.buttonsLayout}>
         <ButtonIcon status={'info'} appearance={'outline'} callback={()=>navigation.navigate('Picture')} accessoryRight = {cameraIcon} text={'Take picture'} />
         <ButtonIcon status={'primary'} appearance={'outline'} callback={()=> pickImage()} accessoryRight = {galleryIcon} text={'Load Picture from Gallery'} />
          </Layout>
      </Layout>
    </Layout>
  )
}


export default HomeScreen;

const styles = StyleSheet.create({
  general: {
    flex: 1,
    backgroundColor: 'rgba(0,190,240,1)'
  },
  body: {
    flex: 4,
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyles: {
    margin: 20,
    width: '80%'
  },
  buttonsLayout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});