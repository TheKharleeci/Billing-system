import client, { Connection, Channel } from 'amqplib'
import config from '../../config/setup'

export const connectionInit = async() => {
    const connection: Connection = await client.connect(
      config?.RABBIT_MQ_URL!
      )    
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue('BillingQueue')
    return channel
}

export const publishToQueue = async (queueName: string, data:string) => {
  const newChannel = await connectionInit();
  newChannel.sendToQueue(queueName, Buffer.from(data), {persistent: true});
}