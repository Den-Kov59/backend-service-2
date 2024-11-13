/* eslint-disable @typescript-eslint/no-require-imports */
const dgram = require('dgram');
const admin = require('firebase-admin');

const serviceAccount = require("../test-app-cbb2d-firebase-adminsdk-ri055-34e896fb14.json");
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`Received message: ${msg.message} from ${rinfo.address}:${rinfo.port}`);
  
  // Handle FCM notification
  const message = {
    data: {
      title: 'New Update',
      body: msg.message.toString(),
    },
    token: msg.token
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
});

server.bind(process.env.port || 8080);