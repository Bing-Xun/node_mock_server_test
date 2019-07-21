var express = require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);
app.set('trust proxy', true);// 設置以後，req.ips是ip數組；如果未經過代理，則為[]. 若不設置，則req.ips恆為[]

app.get('/', function(req, res){
  console.log("headers = " + JSON.stringify(req.headers));// 包含了各種header，包括x-forwarded-for(如果被代理過的話)
  console.log("x-forwarded-for = " + req.header('x-forwarded-for'));// 各階段ip的CSV, 最左側的是原始ip
  console.log("ips = " + JSON.stringify(req.ips));// 相當於(req.header('x-forwarded-for') || '').split(',')
  console.log("remoteAddress = " + req.connection.remoteAddress);// 未發生代理時，請求的ip
  console.log("ip = " + req.ip);// 同req.connection.remoteAddress, 但是格式要好一些
  res.send('Hello World');
});

app.listen(3000);
