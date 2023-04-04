import client, {Connection, Channel, ConsumeMessage} from 'amqplib'
import db from '../../db/setup';
import BillingQueries from '../../db/queries/billing'
import 'dotenv/config';

export const updateBillingRecord = async (data: string): Promise<string | null>=> {  
  return db.oneOrNone(BillingQueries.updateBillingRecord, [data]);
};

const consumer = (channel: Channel) => (msg: ConsumeMessage | null): void => {
    if (msg) {    
      setTimeout(() => {
        const { transactionId } =  JSON.parse(msg.content.toString())
        console.log('processing messages...');  
        updateBillingRecord(transactionId)        
      },100);
      channel.ack(msg)
    }
  }

let channel: Channel;
export const processTransaction = async() => {
    const connection: Connection = await client.connect(
      process.env.RABBIT_MQ_URL!
      );   
    channel = await connection.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME!) 
    await channel.consume(process.env.QUEUE_NAME!, consumer(channel));
}