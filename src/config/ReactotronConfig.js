import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

// eslint-disable-next-line no-undef
if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: '192.168.0.105' })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  // eslint-disable-next-line no-console
  console.tron = tron;

  // Essa linha limpa minha timeline toda vez que damos
  // refresh na aplicação
  tron.clear();
}
