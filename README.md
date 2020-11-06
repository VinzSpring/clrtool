# Clrtool

Clrtool is a cross-platform-native mobile application for extracting colorpalettes from photos previously taken or captured via the app itself.
Extracted palettes can easily be shared via one tap on the share button. The resulting colorscheme can then easily be
imported into Photoshop, Illustrator, etc..

A debug build can be found under /apk/debug/app-debug.apk.

## Example
![](https://github.com/VinzSpring/clrtool/blob/master/photo5226769230236593870.jpg)
### shared palette
![](https://github.com/VinzSpring/clrtool/blob/master/photo5226769230236593873.jpg)
### app also doesn't crash if subject is too cute
![](https://github.com/VinzSpring/clrtool/blob/master/photo5226824819998306001.jpg)
## Usage

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```
## Important!
In order to successfully use the share-button you must fix line 36 in `nodemodules/nativescript-social-share/social-share.android.js`to
```
var sdkVersionInt = 29;//parseInt(platform.device.sdkVersion);
```
This issue exist because of nativescript-social-share not using the Core-API correctly (--> https://github.com/nativescript-vue/nativescript-vue/issues/458).
