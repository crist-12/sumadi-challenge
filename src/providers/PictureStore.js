import create from 'zustand'
import { CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
import { navigatePush } from '../utils/Navigation';

export const usePictureStore = create((set, get) => ({
   typeCamera: CameraType.back,
   setTypeCamera : (typeCamera) => set({typeCamera}),
   photo: null,
   setPhoto: (photo) => set({photo}),
   takingPhoto: false,
   setTakingPhoto: (takingPhoto) => set({takingPhoto}),
   toggleCameraType: () => {
    set({photo: null})
    get().CameraType === CameraType.back ? set({typeCamera: CameraType.front}) : set({typeCamera: CameraType.back})
   },
   pickImage: async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
        base64: true
      });
      if (!result.cancelled) {
        set({photo : result});
      }
      navigatePush('Display')
   },
   uploadId: null,
   setUploadId: (upload_Id) => set({upload_Id}),
   resultTagging: null,
   setResultTagging: (resultTagging) => set({resultTagging}),
   responseStatus: null,
   setResponseStatus : (responseStatus) => set({responseStatus}),
   hasError: false,
   setHasError: (hasError) => set({hasError}),
   errorText: null,
   setErrorText: (errorText) => set({errorText}),
   errorType: null,
   setErrorType: (errorType) => set({errorType}),
   messageStatus: null,
   setMessageStatus: (messageStatus) => set({messageStatus})
}));

