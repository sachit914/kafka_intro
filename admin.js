const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['192.168.124.90:9092'],
})


const admin=kafka.admin();
console.log("connecting admin")

const createTopic=async()=>{
    await admin.connect();
    await admin.createTopics({
        topics:[
            {topic:"user-posts",numPartitions:1},
            {topic:"user-notification",numPartitions:1},
        ]
    })
    console.log("sucessfully connected")
    await admin.disconnect();
}

createTopic();


