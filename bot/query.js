module.exports = function(client, cb) {

  // Get lastest message queued
  client.query("SELECT time_to_post FROM messages LIMIT 5;", null, function(err, result) {
    cb(result);
  });

}
