const fs = require('fs');

const stream = fs.createReadStream('./test.png');
  
stream.on('data', data => {
	process.stdout.write(data)
	// 这里不能用console.log
})