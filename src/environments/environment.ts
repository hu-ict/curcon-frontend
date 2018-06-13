// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// dank je wel: https://stackoverflow.com/questions/44033079/property-firebase-does-not-exist-on-type-production-boolean
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDAz-54nADS2Mr0pNOca0zo-DlULwa6lG0",
    authDomain: "curconhu.firebaseapp.com",
    databaseURL: "https://curconhu.firebaseio.com",
    projectId: "curconhu",
    storageBucket: "curconhu.appspot.com",
    messagingSenderId: "442128035861"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
