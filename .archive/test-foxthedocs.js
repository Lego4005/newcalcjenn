#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
// Removed unused imports and declarations

// Function to create a connection to an MCP server
function connectToServer(serverPath) {
  console.log(`Connecting to server: ${serverPath}`);
  const serverProcess = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Log any errors
  serverProcess.stderr.on('data', (data) => {
    console.error(`Server error: ${data}`);
  });

  return {
    send: (message) => {
      return new Promise((resolve, reject) => {
        const jsonMessage = JSON.stringify(message);
        const lengthPrefix = `Content-Length: ${Buffer.byteLength(jsonMessage, 'utf8')}\r\n\r\n`;
        
        serverProcess.stdin.write(lengthPrefix);
        serverProcess.stdin.write(jsonMessage);
        
        // Simple approach to get a response
        serverProcess.stdout.once('data', (data) => {
          try {
            // Parse the response
            const response = JSON.parse(data.toString().split('\r\n\r\n')[1]);
            resolve(response);
          } catch (error) {
            console.error('Error parsing response:', error);
            reject(error);
          }
        });
      });
    },
    close: () => {
      serverProcess.kill();
    }
  };
}

// Main function to test FoxTheDocs
async function testFoxTheDocs() {
  // Path to the FoxTheDocs server
  const foxTheDocsPath = path.resolve('/home/lego/MCP/servers/FoxTheDocs/build/index.js');
  
  try {
    // Connect to the FoxTheDocs server
    const foxTheDocs = connectToServer(foxTheDocsPath);
    
    // Step 1: Get available tools
    console.log('Getting available tools...');
    const listToolsResponse = await foxTheDocs.send({
      jsonrpc: '2.0',
      id: 1,
      method: 'mcp.list_tools',
      params: {}
    });
    
    console.log('Available tools:', JSON.stringify(listToolsResponse, null, 2));
    
    // Step 2: Run the #load command
    console.log('\nExecuting #load command...');
    const loadResponse = await foxTheDocs.send({
      jsonrpc: '2.0',
      id: 2,
      method: 'mcp.call_tool',
      params: {
        name: 'process_command',
        arguments: {
          message: '#load Initialize the system'
        }
      }
    });
    
    console.log('#load response:', JSON.stringify(loadResponse, null, 2));
    
    // Step 3: Run the #status command
    console.log('\nExecuting #status command...');
    const statusResponse = await foxTheDocs.send({
      jsonrpc: '2.0',
      id: 3,
      method: 'mcp.call_tool',
      params: {
        name: 'process_command',
        arguments: {
          message: '#status Check system status'
        }
      }
    });
    
    console.log('#status response:', JSON.stringify(statusResponse, null, 2));
    
    // Step 4: Run the #fetch command
    console.log('\nExecuting #fetch command...');
    const fetchResponse = await foxTheDocs.send({
      jsonrpc: '2.0',
      id: 4,
      method: 'mcp.call_tool',
      params: {
        name: 'process_command',
        arguments: {
          message: '#fetch https://example.com --format=markdown'
        }
      }
    });
    
    console.log('#fetch response:', JSON.stringify(fetchResponse, null, 2));
    
    // Step 5: Run the #next command
    console.log('\nExecuting #next command...');
    const nextResponse = await foxTheDocs.send({
      jsonrpc: '2.0',
      id: 5,
      method: 'mcp.call_tool',
      params: {
        name: 'process_command',
        arguments: {
          message: '#next Prepare for next task'
        }
      }
    });
    
    console.log('#next response:', JSON.stringify(nextResponse, null, 2));
    
    // Close the connection
    foxTheDocs.close();
    console.log('\nTest completed successfully!');
    
  } catch (error) {
    console.error('Error testing FoxTheDocs:', error);
  }
}

// Run the test
testFoxTheDocs();