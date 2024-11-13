/* eslint-disable @typescript-eslint/no-require-imports */
const dgram = require('dgram');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
  
  // Handle FCM notification
  const message = {
    notification: {
      title: 'New Update',
      body: msg.toString(),
    },
    topic: 'Ttopic',
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