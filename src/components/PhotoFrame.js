import React from "react";
import { StyleSheet, Image } from "react-native";
import { Layout } from "@ui-kitten/components";
import { usePictureStore } from "../providers/PictureStore";



const PhotoFrame = ({children, heightFrame}) => {

    const photo = usePictureStore((state) => state.photo);

    return (
        <Layout style={[styles.pictureFrame, {flex: heightFrame}]}>
            <Layout style={styles.cameraFrame}>
                {/* <Image style={styles.camera} source={{ uri: "data:image/jpg;base64," + photo }} /> */}
                {children}
            </Layout>
        </Layout>
    )
}

export default PhotoFrame;

const styles = StyleSheet.create({
    pictureFrame: {
        //flex: 4,
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',    
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
})