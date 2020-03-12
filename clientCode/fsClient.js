const net = require('net');
const fs = require('fs');

const stdin = process.stdin;
stdin.setEncoding('utf8');
stdin.resume();


const conn = net.createConnection({
  host: 'localhost', // change to IP address
  port: 3000
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log(data);
  console.log();
});


conn.on('connect', () => {
  conn.write('Hello from client!');
});


stdin.on('data', (data) => {
  if (data === '\\q\n') {
    conn.end();
    process.exit();
  }

  conn.write(data);

  conn.on('data', (dataRec) => {
    console.log(dataRec);
    fs.writeFile(`./${data}`, dataRec, (err) => {
      if (err) {
        console.log(`This path does not exist. Exiting`);
        return;
      }
      console.log(`Downloaded and saved ${dataRec.length} bytes of data to ${data}.`);
    });
  });

});