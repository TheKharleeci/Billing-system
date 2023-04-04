import client, { Connection, Channel } from 'amqplib'
import 'dotenv/config';

export const connectionInit = async() => {
    const connection: Connection = await client.connect(
      String(process.env.RABBIT_MQ_URL)
      )    
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(process.env.QUEUE_NAME!)
    return channel
}

export const publishToQueue = async (queueName: string, data:string) => {
  try {
    const newChannel = await connectionInit();
    newChannel.sendToQueue(queueName, Buffer.from(data), {persistent: true});
    console.log('Message published successfully');
  } catch (error) {
    console.log('Error in publishing message', error)
  }
}