<<<<<<< HEAD
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
=======
// const express = require('express');
// const app = express();
// const path x;
//
// app.use(express.static(__dirname + '/dist'));
// app.listen(process.env.PORT || 8080);
//
// app.get('/*', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/dist/index.html'));
// });
//
// console.log('Console Listening!');
//Install express server
const express = require('express');
const path = require('path');
const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/sec-curcon'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/sec-curcon/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
>>>>>>> f34eb42bb4fa1407c06dc1f041689c142435dcdf
