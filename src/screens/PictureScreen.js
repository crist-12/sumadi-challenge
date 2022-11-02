import { StyleSheet, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { Text, Layout, Button, Icon } from '@ui-kitten/components'
import { Camera, CameraType } from 'expo-camera';

import { usePictureStore } from '../providers/PictureStore';

import PhotoFrame from '../components/PhotoFrame';

const PictureScreen = ({ navigation }) => {

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const typeCamera = usePictureStore((state) => state.typeCamera);
  const toggleCameraType = usePictureStore((state) => state.toggleCameraType);


  const photo = usePictureStore((state) => state.photo);
  const setPhoto = usePictureStore((state) => state.setPhoto);

  const takingPhoto = usePictureStore((state) => state.takingPhoto);
  const setTakingPhoto = usePictureStore((state) => state.setTakingPhoto);




  const cameraRef = useRef();


  if (!permission) {
    return <Layout />;
  }

  if (!permission.granted) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} accessoryRight={infoIcon}>Grant permission</Button>
      </Layout>
    );
  }

  const infoIcon = (props) => (
    <Icon {...props} name='info-outline' />
  );


  const flipIcon = (props) => (
    <Icon {...props} name='flip-outline' />
  );


  const cameraIcon = (props) => (
    <Icon {...props} name='camera-outline' />
  );


  const nextIcon = (props) => (
    <Icon {...props} name='arrow-circle-right-outline' />
  );

  const closeIcon = (props) => (
    <Icon {...props} name='close-circle-outline' />
  );

  const homeIcon = (props) => (
    <Icon {...props} name='home-outline' />
  );



  const takePictureCamera = async () => {
    setTakingPhoto(true);
    const options = {
      base64: true,
      exif: false,
      isImageMirror: true,
      quality: 0.5
    };
    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setTakingPhoto(false);
    setPhoto(newPhoto);
  };

  return (
    <Layout style={styles.general}>
      <Layout style={styles.body}>
        <Layout style={styles.clearButtonView}>
          <Button style={styles.controlButton} status={'success'} appearance={'outline'} onPress={() => navigation.navigate('Home')} accessoryRight={homeIcon}></Button>
          <Button style={styles.controlButton} status={'info'} appearance={'outline'} onPress={() => setPhoto(undefined)} accessoryRight={closeIcon}></Button>
        </Layout>
        <PhotoFrame heightFrame={4}>
          {
            photo ?
              <Image style={styles.camera} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
              :
              <Camera style={styles.camera} type={typeCamera} ref={cameraRef}>

                <Layout style={styles.buttonContainer}>
                  {takingPhoto ?
                    <Layout style={styles.waitMessage}>
                      <Text style={styles.textWaitMessage}>Taking picture, please wait...</Text>
                    </Layout> : null
                  }
                </Layout>
              </Camera>
          }
        </PhotoFrame>
        <Layout style={styles.buttonControlFrame}>
          <Button style={styles.controlButton} status={'info'} appearance={'outline'} onPress={toggleCameraType} accessoryRight={flipIcon}></Button>
          <Button style={styles.controlButton} status={'primary'} appearance={'outline'} onPress={takePictureCamera} accessoryRight={cameraIcon}></Button>
          <Button style={styles.controlButton} onPress={() => navigation.navigate('Display')}  /*onPress={getresponse2}*/ status={'success'} appearance={'outline'} accessoryRight={nextIcon} disabled={photo ? false : true}></Button>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default PictureScreen;

const styles = StyleSheet.create({
  general: {
    flex: 1,
    backgroundColor: 'white'
  },
  body: {
    flex: 4,
    margin: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearButtonView: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //alignItems: 'spa',
    padding: 10,
    borderTopLeftRadius: 120,

  },
  pictureFrame: {
    flex: 4,
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonControlFrame: {
    flex: 1,
    width: '100%',
    margin: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  cameraFrame: {
    display: 'flex',
    width: '80%',
    height: '90%',
    borderStyle: 'dashed',
    borderWidth: 1
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  controlButton: {
    width: '25%',
    height: '60%',
    textAlign: 'center'
  },
  waitMessage: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  textWaitMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})