import {Kafka} from 'kafkajs';

import dotenv from 'dotenv';

dotenv.config();


const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'connect4-backend',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();

export const connectProducer = async () => {
     await producer.connect();
     console.log('✅ Kafka Producer connected');
}

export const sendGameEvent = async (topic, data) => {
       await producer.send({
         topic,
         messages: [{ value: JSON.stringify(data)}],
       })
}
