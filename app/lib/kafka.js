const { Kafka } = require('kafkajs')


const kafka = new Kafka({
  clientId: 'kevin',
  brokers: ['xxxxxxxxx.confluent.cloud:9092'],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: '',
    username: '',
    password: ''
  }
})


const producer = kafka.producer()
producer.on('producer.connect', () => {
  console.log(`KafkaProvider: connected`);
});
producer.on('producer.disconnect', () => {
  console.log(`KafkaProvider: could not connect`);
});
producer.on('producer.network.request_timeout', (payload) => {
  console.log(`KafkaProvider: request timeout ${payload.clientId}`);
});
const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'supplier-ratings',
    messages: [
      {
        value: Buffer.from(JSON.stringify(
          {
            "event_name": "kevin",
            "external_id": user_uuiD,
            "payload": userId,
            "metadata": {
              "user_uuid": "5a12cba8-f4b5-495b-80ea-d0dd5d4ee17e"
            }
          }
        ))
      },
    ],
  })

  Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'kevin-testing', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)