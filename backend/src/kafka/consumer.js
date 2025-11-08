import {Kafka} from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
       
    clientId: 'connect4-analytics',
    brokers:  [process.env.KAFKA_BROKER || 'localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'analytics-group' });


export const startConsumer = async ()=>{
    await consumer.connect();
    console.log('✅ Kafka Consumer connected');

    await consumer.subscribe({ topic: 'game_events', fromBeginning: true});

    await consumer.run({
        eachMessage: async ({ topic, partition, message}) => {
            const event = JSON.parse(message.value.toString());
            console.log('📩 Received event:', event)
        }
    })
}