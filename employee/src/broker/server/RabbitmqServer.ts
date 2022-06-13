import { Connection, Channel, connect, Message, ConsumeMessage } from "amqplib";
import IBrokerServer from "./IBrokerServer";

class RabbitMQServer implements IBrokerServer {
    private connection!: Connection;
    private channel!: Channel;
    private static instance: RabbitMQServer;

    async start(uri: string) {
        try {
            if (!this.connection) {
                this.connection = await connect(uri);
                this.channel = await this.connection.createChannel();
                console.log('rabbitmq connected');
            }
        } catch (error) {
            console.log('Error when try to connect rabbitmq...', error);
            throw error;
        }
    }

    static getInstance() {
        if(!this.instance)
            this.instance = new RabbitMQServer();

        return this.instance;
    }

    async createExchange(exchangeName: string, exchangeType: string) {
        await this.channel.assertExchange(exchangeName, exchangeType, { durable: true });
    }

    async createQueue(queueName: string) {
        await this.channel.assertQueue(queueName, { durable: true });
    }

    async bindQueue(queueName: string, exchangeName: string, routingKey: string = '') {
        await this.channel.bindQueue(queueName, exchangeName, routingKey);
    }

    publishInQueue(queue: string, message: string) {
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    publishInExchange(exchange: string, routingKey: string, message: object) {
        this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    }

    async consumeMessage(queue: string, callback: Function) {
        await this.channel.consume(queue, (message) => {
            callback(message);
            this.channel.ack(message as Message);
        });
    }
}

export default RabbitMQServer;