import client, { Connection, Channel } from 'amqplib'
import config from '../../config/setup'
import { logger } from '../../utils/helpers.hash'

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
    logger.info('Message published successfully');
  } catch (error) {
    logger.error('Error in publishing message', error)
  }
}