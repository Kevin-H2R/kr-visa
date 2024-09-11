import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    return access_token
  } catch (e) {
    console.log(e)
  }
};

const isLoggedIn = async () => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    return !!access_token
  } catch (e) {
    return false
  }
};

export {isLoggedIn, getAccessToken}
