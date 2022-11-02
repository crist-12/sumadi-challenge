import { StyleSheet, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Layout, Spinner, Button } from "@ui-kitten/components";
import axios from "axios";
import { usePictureStore } from "../providers/PictureStore";
import * as MediaLibrary from 'expo-media-library'
import * as qs from 'qs'

import PhotoFrame from "../components/PhotoFrame";

import { APIKEY, APISECRET, AUTHORIZATION, URL, ENDPOINT } from "@env";

const DisplayScreen = () => {
  const photo = usePictureStore((state) => state.photo);
  const resultTagging = usePictureStore((state) => state.resultTagging);
  const setResultTagging = usePictureStore((state) => state.setResultTagging);
  const setMessageStatus = usePictureStore((state) => state.setMessageStatus);
  const hasError = usePictureStore((state) => state.hasError);
  const setHasError = usePictureStore((state) => state.setHasError);
  const errorText = usePictureStore((state) => state.errorText);
  const setErrorText = usePictureStore((state) => state.setErrorText);

  const [hasMediaPermissions, setHasMediaPermissions] = useState()

  useEffect(() => {
    getApiResponse();
    (async ()=> {
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermissions(mediaLibraryPermission.status === 'granted')
    })();
    
  }, []);

  const getApiResponse = () => {
    setResultTagging(null)
    setHasError(false)
    const configUpload = {
      method: "POST",
      url: URL + "uploads",
      headers: {
        apiKey: APIKEY,
        apiSecret: APISECRET,
        Authorization: "Basic " + AUTHORIZATION,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: {
        image_base64: photo.base64,
      },
    };
    setMessageStatus("Uploading image...");

    axios(configUpload)
      .then(function (response) {
        setHasError(false);
        var data = qs.stringify({
          'imageid': response.data.result.upload_id
        });
        var config = {
          method: 'post',
          url: ENDPOINT+'getTagging',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          }, 
          data : data
        };
        
        axios(config)
        .then(function (response) {
          setResultTagging(response.data.result);
            setMessageStatus(false);
            setHasError(false);
        })
        .catch(function (error) {
          setHasError(true);
          setErrorText('Something went wrong')
        });
        
      })
      .catch(function (error) {
        setHasError(true);
        console.log(error)
        setErrorText('Something went wrong');
      });
  };

 
  const savePictureToGallery = () => {
    MediaLibrary.saveToLibraryAsync(photo.uri)
    .then(()=> {
      alert('Image saved sucessfully')
    })
    .catch(()=> {
      alert('Something went wrong while saving your image.')
    })
  }

  return (
    <Layout style={styles.general}>
      <Layout style={styles.body}>
        <PhotoFrame heightFrame={2}>
          <Image
            style={styles.camera}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          />
        </PhotoFrame>
        <Layout style={{ flex: 3 }}>
          {hasError ? (
            <Text>{errorText}</Text>
          ) : resultTagging ? (
            <ScrollView>
              <Text style={{ textAlign: "justify" }}>
                {JSON.stringify(resultTagging, null, 2)}
              </Text>
            </ScrollView>
          ) : (
            <Layout style={styles.spinnerContainer}>
              <Spinner status="info" />
              <Text>Analyzing image...</Text>
            </Layout>
          )}
        </Layout>
        <Layout style={styles.buttonSave}>
            {hasMediaPermissions ?
            <Button status={'info'} appearance={'outline'} onPress={savePictureToGallery}>Save to Gallery</Button>
            : null }
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DisplayScreen;

const styles = StyleSheet.create({
  general: {
    flex: 1,
    backgroundColor: "rgba(0,190,240,1)",
  },
  body: {
    flex: 4,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    textAlign: "center",
    //borderTopLeftRadius: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureFrame: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraFrame: {
    display: "flex",
    width: "80%",
    height: "90%",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  camera: {
    flex: 1,
    resizeMode: 'contain'
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSave:{ 
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
