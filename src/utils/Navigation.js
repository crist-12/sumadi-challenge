import { navigateRef } from "../../App";

export const navigatePush = (screenName) => {
    if(navigateRef.isReady()){
        navigateRef.navigate(screenName)
    }
}