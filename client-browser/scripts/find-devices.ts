import { exec } from 'child_process';
import net from 'net';
import ping from "ping"

// Define the range of IP addresses to scan
const startIp = '192.168.1.1';
const endIp = '192.168.1.254';



// Define common server ports to check
const portsToCheck = [80, 443, 22, 21, 3000, 5173]; // HTTP, HTTPS, SSH, FTP

// Function to ping an IP address
async function pingIp(ip) {
    return new Promise<boolean>((resolve) => {
    let response = false
    ping.sys.probe(startIp, function(isAlive){
        console.log(isAlive ? 'host ' + ip + ' is alive' : 'host ' + ip + ' is dead');
        response = !!isAlive
    });
    resolve(response)
})
}

// Function to check if a port is open on an IP address
async function checkPort(ip, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000); // Set timeout for connection attempt

    socket.on('connect', () => {
      // If connection is successful, resolve with the port number
      socket.destroy();
      resolve(port);
    });

    socket.on('error', () => {
      // If connection fails, resolve with null
      resolve(null);
    });

    socket.connect({ host: ip, port });
  });
}

// Perform LAN scanning
async function scanLAN() {
    console.log('Scanning LAN for active hosts...');
  for (let i = 1; i <= 254; i++) {
    const ip = `192.168.1.${i}`;
    const pingResult = await pingIp(ip);

    if (pingResult) {
      console.log(`Host ${pingResult} is active`);
      
      // Check common server ports
      for (const port of portsToCheck) {
        const portResult = await checkPort(pingResult, port);
        console.log(`  Port ${portResult}`);
        if (portResult) {
          console.log(`  Port ${portResult} is open`);
        }
      }
    }
  }
}

// Start the LAN scan
scanLAN();
