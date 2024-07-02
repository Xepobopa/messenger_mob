import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './src/navigation/Navigator';
import store from './src/store/store';

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}

export default App;
