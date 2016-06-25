module.exports = function(client, command, cb) {

  // Get item specified with given command
  client.query(command, null, function(err, result) {
    cb(result);
  });

}
