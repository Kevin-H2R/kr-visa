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

const refresh = async () => {
  const refresh_token = await AsyncStorage.getItem('refresh_token')
  const response = await fetch("http://localhost:3000/auth/refresh", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token: refresh_token})
  })
  if (response.status === 403) {
    await AsyncStorage.clear()
    window.location.reload()
  }
  const data = await response.json()
  AsyncStorage.setItem('access_token', data['access_token'])
  AsyncStorage.setItem('refresh_token', data['refresh_token'])
}

export {isLoggedIn, getAccessToken, refresh}
