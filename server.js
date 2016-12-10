'use strict';

const config = require('./config');
const chalk = require('chalk');
const cluster = require('cluster');
const chokidar = require('chokidar');

let app = undefined;
let numWorkers = require('os').cpus().length;
let workerCount = 0;

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

function createWorkers(){
  if(workerCount<=0){
    return;
  }else{
    cluster.fork();
    workerCount--;
    setTimeout(createWorkers, 2*1000);
  }
}

if(cluster.isMaster){

  //Watcher for no downtime updatation
  let watcher = chokidar.watch('.',{
    ignored: ['tmp/*','public/*'],
    persistent: true,
    ignoreInitial: true,
    cwd: '.',
    depth: 99,
    interval: 10000
  }).on('all', restartWorkers);


  if(numWorkers === 1){
    numWorkers *= 2;
  }

  console.log(chalk.yellow("Master setting up "+numWorkers+" workers"));
  workerCount = numWorkers;

  createWorkers();

  // for(let i=0;i<numWorkers;i++){
  //   setTimeout(()=>{
  //     cluster.fork()
  //   }, 2*1000);
  //   // cluster.fork();
  // }
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
let appRestarting = false;

function restartWorkers(event, path){
  if(appRestarting){
    return;
  }
  for(let wid in cluster.workers){
    workerIds.push(wid)
  }
  appRestarting = true;
  setTimeout(()=>{
    appRestarting = false;
  }, numWorkers*1000*5);
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
