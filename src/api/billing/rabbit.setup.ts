import client, { Connection, Channel } from 'amqplib'
import config from '../../config/setup'

export const connectionInit = async() => {
    const connection: Connection = await client.connect(
      config?.RABBIT_MQ_URL!
      )    
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(config?.QUEUE_NAME!)
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