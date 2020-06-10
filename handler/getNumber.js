const { OK } = require("../requestResponseWrapper");

async function addUser(ctx) {
  const number = parseInt(ctx.query.number);
  console.log("number: ", Array.from(Array(number).keys()));
  const result = Array.from(Array(number).keys()).map((number) => {
    const is4Divisible = getIs4Divisible(number + 1);
    const is7Divisible = getIs7Divisble(number + 1);
    if (is4Divisible && is7Divisible) {
      return "marcopolo";
    }
    if (is4Divisible) {
      return "marco";
    }
    if (is7Divisible) {
      return "polo";
    }
    return number + 1;
  });
  const response = result.join(" ");
  return OK(true, response, "response");
}

function getIs7Divisble(number) {
  if (number.toString().length <= 2) {
    if (!(number % 7)) {
      return true;
    }
    return false;
  }
  while (number.toString().length > 2) {
    const lastDigit = parseInt(getLastDigit(number, 1));
    number = Math.floor(number / 10);
  }
  return false;
}

function getIs4Divisible(number) {
  const lastTwoDigits = parseInt(getLastDigit(number, 2));
  if (!(lastTwoDigits % 4)) {
    return true;
  }
  return false;
}

function getLastDigit(number, fromLast) {
  return number.toString().substr(-fromLast);
}

module.exports = addUser;
