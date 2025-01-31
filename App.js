import StackNavigator from './StackNavigator';
import { Provider } from 'react-redux';
import Store from './Store';

export default function App() {
  return (
 <>
 <Provider store={Store}>
 <StackNavigator/>
 </Provider>
 </>
  );
}


