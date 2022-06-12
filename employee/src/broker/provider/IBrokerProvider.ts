import { Replies } from 'amqplib';

export default interface IBrokerProvider {
    start(uri: string): Promise<void>;
    createExchange(exchangeName: string, exchangeType: string): Promise<void>;
    createQueue(queueName: string): Promise<void>;
    bindQueue(queueName: string, exchangeName: string, routingKey: string): Promise<void>;
    publishInQueue(queue: string, message: string): Promise<boolean>;
    publishInExchange(exchange: string, routingKey: string, message: object): boolean;
    consumeMessage(queue: string, callback: Function): Promise<Replies.Consume>
}