// make sure Data is serialized properly, app-wide
(function(replace) {
    Date.prototype.toJSON = function() {
        return new Date(this.getTime() - this.getTimezoneOffset() * 60000).toISOString();
    };
})(Date.prototype.toJSON);

import { registerRootComponent } from 'expo';

import App from './src/App';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
