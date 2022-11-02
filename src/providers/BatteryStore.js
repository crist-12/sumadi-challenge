import create from 'zustand'
import * as Battery from "expo-battery";


export const useBatteryStore = create((set, get) => ({
    isAvailable: null,
    setAvailable: (isAvailable) => set({isAvailable}),
    batteryLevel: -1,
    setBatteryLevel: (batteryLevel) => set({batteryLevel}),
    batteryState: Battery.BatteryState.UNKNOWN,
    batteryStateDescription : null,
    batteryIcon: 'warning',
    setBatteryState : (batteryState) => {
        set({batteryState});
        switch (batteryState) {
            case Battery.BatteryState.UNPLUGGED:
              set({batteryStateDescription: 'UNPLUGGED'})
              if (get().batteryLevel >= 70) {
                 set({batteryIcon: 'battery-full-outline'})
              } else if (get().batteryLevel < 70 && get().batteryLevel > 20) {
                set({batteryIcon: 'battery-half-outline'})
              } else {
                set({batteryIcon: 'battery-dead-outline'})
              }
              break;
            case Battery.BatteryState.CHARGING:
              set({batteryStateDescription: 'CHARGING'})
              set({batteryIcon: 'battery-charging-outline'})
              break;
            case Battery.BatteryState.FULL:
              set({batteryStateDescription: 'FULL'})
              set({batteryIcon: 'battery-full-outline'})
              break;
            case Battery.BatteryState.UNKNOWN:
            default:
              set({batteryStateDescription: 'UNKNOWN'})
              set({batteryIcon: 'warning'})
          }
    },
  }));