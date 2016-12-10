'use strict';

const config = require('./config');
const chalk = require('chalk');
const cluster = require('cluster');
const chokidar = require('chokidar');

let app = undefined;

const server_port = config.server.port;

exports.start = (isTest)=>{
  if(isTest===undefined){
    config.db.uri = config.db.uri+"_test";
  }
  app = require('./framework/bootstrap')(config);

  app.listen(server_port, function () {
    console.log(chalk.red.bold("Server running at port: "+server_port));
  });
  process.on('message', function(message) {
    if(message.command === 'shutdown' && message.from === 'master') {
      process.exit(0);
    }
  });
};

exports.close = ()=> {
  app.close();
};


process.on('unhandledRejection', (reason, p) => {
  console.log(chalk.red("Unhandled Rejection at: Promise "), p, chalk.red(" reason: "), chalk.red(reason));
});

process.on('unhandledException', (error, m)=> {
  console.log(chalk.red("Unhandled Exception at: Error "), m, chalk.red(" reason: "), chalk.red(error));
})

if(cluster.isMaster){

  //Watcher for no downtime updatation
  let watcher = chokidar.watch('.',{
    ignored: ['tmp/*'],
    persistent: true,
    ignoreInitial: true,
    cwd: '.',
    depth: 99,
    interval: 1000
  }).on('all', restartWorkers);

  let numWorkers = require('os').cpus().length;

  if(numWorkers === 1){
    numWorkers *= 2;
  }

  console.log(chalk.yellow("Master setting up "+numWorkers+" workers"));


  for(let i=0;i<numWorkers;i++){
    cluster.fork();
  }
  cluster.on('online', (worker)=>{
    console.log(chalk.magenta("Worker thread: "+worker.process.pid+" is online"));
  });
  cluster.on('exit', (worker, code, signal)=>{
    console.log(chalk.red('Worker thread: '+worker.process.pid+" is exiting"));
    cluster.fork();
  });
}else{
  exports.start(false);
}

let workerIds = [];
function restartWorkers(event, path){
  for(let wid in cluster.workers){
    workerIds.push(wid)
  }
  stopWorker();
}

function stopWorker(){
  if(workerIds.length<=0){
    return;
  }
  if(Object.keys(cluster.workers).length>0){
    let wid = workerIds.pop();
    cluster.workers[wid].send({
      command: 'shutdown',
      from: 'master'
    });
    setTimeout(()=>{
      if(cluster.workers[wid]){
        cluster.workers[wid].process.kill('SIGKILL');
      }
    }, 20*1000);
  }
  setTimeout(stopWorker, 5*1000);
}
