const net = require('net');
const fs = require('fs');

const server = net.createServer();


let filesAvailable;



fs.readdir('./files/', (err, itemArray) => {
  console.log(itemArray);
  filesAvailable = itemArray;
  console.log(filesAvailable);
  
});

console.log(filesAvailable);

server.on('connection', (client) => {
  client.setEncoding('utf8'); // interpret data as text
  client.write('Welcome to the File Server.');
  client.write(`The following ${filesAvailable.length} file(s) are available:\n`);


  filesAvailable.forEach((elem) => {
    client.write(`- ${elem}\n`);
  });



  client.write('Please select one by entering the file name:');


  // Handle client communication
  client.on('data', (data) => {
    data = data.trim(); //need to remove line brake at the end of the received data
    if (filesAvailable.includes(data.toString())) {
      console.log('client wants: ', data);

      fs.readFile(`./files/${data}`, (err, data) => {
        if (err) throw err;
        client.write(data);
      });
      
    } else {
      console.log(`Message from client: `, data);
    }

    
  });
});



server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


