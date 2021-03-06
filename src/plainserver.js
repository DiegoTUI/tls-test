'use strict';

const net = require('net');

const opts = {
  host: process.argv[2] || '127.0.0.1',
  port: process.argv[3] || 1200
}

const regex = /\n/g;
const server = net.createServer({}, s => {
  let events = 0;
  console.log('client connected');

  s.setEncoding('utf8');
  //s.write('welcome!\n');

  s.on('data', data => {
    events += (data.match(regex) || []).length;
    console.log('From client:', data);
  });

  s.on('end', () => console.log('socket ended', events));
  s.on('close', () => console.log('socket closed'));

  s.on('error', console.log.bind(null, 'error'))
});

server.listen(opts, console.log.bind(null, 'server listening', opts));
