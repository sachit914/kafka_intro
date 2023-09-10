// notification-consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'notification-consumer',
  brokers: ['192.168.124.90:9092'],
});


const consumer = kafka.consumer({ groupId: 'notification-group' });

const processPost = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-posts', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      // Process the post message and send notifications to followers
      const user = message.key.toString();
      const post = message.value.toString();
      // Implement your notification logic here, e.g., send notifications to followers
      console.log(`Received new post from user ${user}: ${post}`);
    },
  });
};

processPost();