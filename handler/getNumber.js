const { OK } = require("../requestResponseWrapper");
const CONSTANTS = require("../constants");
const redis = require("../services/redis");

async function addUser(ctx) {
  const number = parseInt(ctx.query.number);
  const limit = await redis.getLimit();
  let result = [];
  if (!limit) {
    const arr = getArray(0, number);
    result = await calculateManually(arr, number);
  } else {
    const list = await redis.getRangeOfList(number);
    if (limit >= number) {
      result = list;
    } else {
      const arr = getArray(limit, number);
      const restArray = await calculateManually(arr, number);
      result = list.concat(restArray)
    }
  }
  const response = result.slice(0, number).join(" ");
  return OK(true, response, "response");
}

function getArray(start, end) {
  var arr = new Array(end - start);
  for (var j = 0; j < arr.length; j++, start++) {
    arr[j] = start;
  }
  return arr;
}

async function calculateManually(arr, limit) {
  const result = arr.map((number) => {
    const parsedNumber = parseInt(number);
    const is4Divisible = getIs4Divisible(parsedNumber + 1);
    const is7Divisible = getIs7Divisble(parsedNumber + 1);
    if (is4Divisible && is7Divisible) {
      return !((parsedNumber + 1) % 1000) ? "marcopolo \n" : "marcopolo";
    }
    if (is4Divisible) {
      return !((parsedNumber + 1) % 1000) ? "marco \n" : "marco";
    }
    if (is7Divisible) {
      return !((parsedNumber + 1) % 1000) ? "polo \n" : "polo";
    }
    return !((parsedNumber + 1) % 1000)
      ? `${parsedNumber + 1} \n`
      : parsedNumber + 1;
  });
  await redis.insertList(result);
  await redis.insertLimit(limit);
  return result;
}

function getIs7Divisble(number) {
  if (number.toString().length <= 2) {
    if (CONSTANTS.DIVISIBLE_BY_7.includes(number)) {
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
  if (CONSTANTS.DIVISIBLE_BY_4.includes(lastTwoDigits)) {
    return true;
  }
  return false;
}

function getLastDigit(number, fromLast) {
  return number.toString().substr(-fromLast);
}

module.exports = addUser;
