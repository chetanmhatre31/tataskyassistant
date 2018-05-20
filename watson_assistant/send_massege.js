var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new AssistantV1({
  username: '980c1826-9da1-4e65-832f-2a7f8d3c59e0',
  password: '1vLI22mdA2OT',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16'
});

function assistant_message(username, password, callback) {
    var info = {user: username, pwd: password};

    return assistant.message(
      {
        input: { text: "" },
        workspace_id: 'c72784bc-1422-4bf1-be2b-abedc13b381f'
      },
      function(err, response) {
        if (err) {
          console.error(err);
        } else {

          console.log(response["output"]["text"]);

        }
      callback(err, response);
      }
    );


};
