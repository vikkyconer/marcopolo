const redis = require("redis");
const client = redis.createClient();

const LIST_KEY = 'list'

client.on("error", function (error) {
  console.error(error);
});

function insertLimit(limit) {
  return new Promise((resolve, reject) => {
    client.set("limit", limit, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

function insertList(numbers) {
  console.log('numbers: ', numbers)
  return new Promise((resolve, reject) => {
    client.rpush(LIST_KEY, numbers, (error, response) => {
      if (error) {
        console.log("error: ", error);
        reject(error);
      } else {
        console.log("response: ", response);
        resolve(true);
      }
    });
  });
}

function getLimit() {
  return new Promise((resolve, reject) => {
    client.get("limit", (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function getList() {
  return new Promise((resolve, reject) => {
    client.get(LIST_KEY, (error, response) => {
      if (error) {
        console.log("error: ", error);
        reject(error);
      } else {
        console.log("response: ", response);
        resolve(response);
      }
    });
  });
}

function getRangeOfList(end) {
  return new Promise((resolve, reject) => {
    client.lrange(LIST_KEY, 0, end, (error, response) => {
      if (error) {
        console.log("error: ", error);
        reject(error);
      } else {
        console.log("response: ", response);
        resolve(response);
      }
    });
  });
}

module.exports = {
  insertList,
  insertLimit,
  getLimit,
  getList,
  getRangeOfList
};
