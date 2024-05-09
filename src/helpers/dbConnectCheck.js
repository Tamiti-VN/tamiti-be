import os from "node:os";
import mongoose from "mongoose";
const _TIME = 5000;

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connection >>> ${numConnection}`);
};

const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;

    console.log(`Active connection: ${numConnection}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnection > maxConnections) {
      console.log("Master! Your sever is overloading!!!");
    }
  }, _TIME); //Monitor every 5s
};

export { countConnect, checkOverLoad };
