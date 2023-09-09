# kafka_intro

<details>

  <summary>
    kafka architecture
  </summary>

  ![4](https://github.com/sachit914/kafka_intro/assets/137917052/617b5b4b-4b2a-44f6-90f1-134d312c1396)

  ### distribution between consumers

  if there is a group and 4 partion of data and one consumer then by default because of load balancer all partion is consumed by one consumer
  
  ![5](https://github.com/sachit914/kafka_intro/assets/137917052/8b468d2e-8c32-40ae-9637-4912f6df5c08)

![6](https://github.com/sachit914/kafka_intro/assets/137917052/b3835f35-99dd-4b1f-94ca-b06685b69694)

If you have a topic with 4 partitions and 2 consumers in the same consumer group:

-Each consumer can consume from 2 partitions. So, it's possible that Consumer 1 gets partitions 1 and 2, and Consumer 2 gets partitions 3 and 4.

-If one of the consumers fails or is shut down, the remaining consumer will take over and start consuming from all 4 partitions.

-If you add a third consumer to the group, rebalancing will occur. The partitions will be redistributed among the consumers. It's possible for each consumer to get at least one partition, but one of the consumers will be assigned 2 partitions.

  ![7](https://github.com/sachit914/kafka_intro/assets/137917052/372f0d84-67df-433c-896c-10ac60b6e588)


If you have 5 consumers in the same consumer group and only 4 partitions in a Kafka topic, the assignment will generally look like this:

-Four of the consumers will each be assigned one partition.
-The fifth consumer will not be assigned any partitions and will remain idle.

### note
![8](https://github.com/sachit914/kafka_intro/assets/137917052/62e6d410-290c-47c5-84af-be6445bbcea2)

1 consumer can consume multiple partion


![9](https://github.com/sachit914/kafka_intro/assets/137917052/56f26973-60cb-4575-909e-e6b70b2f5c9f)

but one partion is consumed by one

</details>

<details>

  <summary>
    consumer groups
  </summary>

  ![10](https://github.com/sachit914/kafka_intro/assets/137917052/ae6bc7fc-3884-43bf-81e6-a27db832b1a0)

Consumer Group 1 (4 consumers):

Since there are 4 partitions and 4 consumers in this group, each consumer would typically be assigned to consume messages from 1 partition. So the distribution might look something like this:

- Consumer 1A -> Partition 1
- Consumer 1B -> Partition 2
- Consumer 1C -> Partition 3
- Consumer 1D -> Partition 4
  
 Consumer Group 2 (1 consumer):
 The single consumer in this group would consume messages from all 4 partitions since there aren't other consumers in this group to share the partitions with. So the distribution would be:

- Consumer 2A -> Partitions 1, 2, 3, and 4
</details>

<details>
  <summary>
    code
  </summary>

  ## requirement

  -zookeeper to handle kafka
  -node js
  -docker
  
  ## steps

  ### step1
  ```
docker run -p 2181:2181 zookeeper
```

```
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=192.168.1.4:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.1.4:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka

```

```
npm init
```

```
npm install kafkajs
```

create client.js file
```
const {kafka}=require("kafkajs");

// step 1 kafka broker
exports.kafka=new Kafka({
    clientId:"my-app",
    brokers:['http://localhost(use ip address):9092'],
})

//broker is 192.168.1.4:9092
```

create admin.js file
admin create topics etc
```
const{Kafka}=require('./client')



async function init(){

    //step 2 create admin
    const admin =kafka.admin();
    console.log("admin connecting...");
    admin.connect();
    console.log("admin connection success....")

    // step 3 create topics 
    console.log("creating topic[rider-updates");
    await admin.createTopics({
        topics:[
            {
                topic:"rider-updates",
                numPartitions:2,

            },
        ],
    });
    console.log("Topics Created Sucessfully [rider-updates]")

    console.log("disconnecting [rider_updates")
    await admin.disconnect();
}

init();
```

```
node admin.js
```

create producer.js file

<details>
  <summary>
    code
  </summary>

  ```
const {kafka} = require('./client')


async function init(){
    const producer = kafka.producer();

    console.log('Connecting Producer')
    await producer.connect();
    console.log("Producer Connected Successfully")

    await producer.send({
        topic:'rider-updates',
        messages:[
            {
                partion:0,
                key:'location-update',
                value:JSON.stringify({name:'tony stark',loc:'south'})}
        ],
    })

await producer.disconnect();

}

init();
```
</details>

create consumer.js file


</details>


create admin and broker

create producer 
connect producer
produce

create consumer
connect consumer
consume->subscribe







