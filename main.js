const { spawn } = require('child_process');
const ls = spawn('node', ['child_script.js']);
const fs = require('fs');

const wirteStream = fs.createWriteStream('./result.png')

console.log(wirteStream.writableHighWaterMark)  // 16384 => 16kb
// console.log(readable.readableHighWaterMark)  // 65536 => 64kb

ls.stdout.on('data', (data) => {
  console.log(data);
  console.log(`stdout type: ${typeof data}`);
  console.log(`byteLength: ${Buffer.byteLength(data)}`); // 第一次64kb，第二次开始128kb，最后一次不定
  wirteStream.write(data)
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});