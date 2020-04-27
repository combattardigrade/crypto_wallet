export const SAVE_LANGUAGE = 'SAVE_LANGUAGE'
export const SAVE_DEVICE_DATA = 'SAVE_DEVICE_DATA'

export function saveLanguage(language) {
    return {
        type: SAVE_LANGUAGE,
        language
    }
}

export function saveDeviceData(deviceData) {
    return {
        type: SAVE_DEVICE_DATA,
        deviceData        
    }
}