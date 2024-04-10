/**
 * When compiling for mobile, it will search for index.js on root.
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);