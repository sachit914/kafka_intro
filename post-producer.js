// post-producer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'post-producer',
  brokers: ['192.168.124.90:9092'],
});

const producer=kafka.producer()

const producePost=async(user,message)=>{
    await producer.connect();
    console.log("producer connected sucessfully")
    await producer.send({
        topic:'user-posts',
        messages:[{key:user,value:message}],
    })
    console.log("successfully produced")
    await producer.disconnect();
}

module.exports = producePost;