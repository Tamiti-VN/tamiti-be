import mongoose from 'mongoose';
import os from 'node:os';
const _TIME = 5000;

const countConnect = () => {
  let numConnection = mongoose.connections.length;
  console.log(`Number of connection >>> ${numConnection}`);
};

const checkOverLoad = () => {
  setInterval(() => {
    let numConnection = mongoose.connections.length;
    let numCores = os.cpus().length;
    let memoryUsage = process.memoryUsage().rss;
    let maxConnections = numCores * 5;

    console.log(`Active connection: ${numConnection}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnection > maxConnections) {
      console.log('Master! Your sever is overloading!!!');
    }
  }, _TIME); //Monitor every 5s
};

export { countConnect, checkOverLoad };
