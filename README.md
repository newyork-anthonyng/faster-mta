# faster-mta
This is a rebuilt version of [MTA Subway Time website](http://subwaytime.mta.info/index.html#/app/home). [You can view it here](https://faster-mta.firebaseapp.com/). 

## Getting started
```shell
$ npm install
$ npm start
$ open http://localhost:8080
```

## Deployment
This website uses Firebase. It uses [Firebase Hosting](https://firebase.google.com/docs/hosting/) to host static assets, and [Firebase Functions](https://firebase.google.com/docs/functions/) for the backend.

```shell
$ npm run deploy.hosting # deploy to Firebase Hosting
$ npm run deploy.functions # deploy to Firebase Functions
```

## Audit
The main focus of this website is to provide a *fast* user experience.

We will use [WebPageTest](https://www.webpagetest.org/result/181114_JX_e1aa86c65619d1755c0f0ee1f59429d6/) to measure this.