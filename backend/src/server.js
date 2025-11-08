import { connectProducer, sendGameEvent } from "./kafka/producer.js";
import { startConsumer } from "./kafka/consumer.js";
// import { timeStamp } from "node:console";



await connectProducer();
await startConsumer();



await sendGameEvent('game_events', { type: 'server_started', timestamp: Date.now() });