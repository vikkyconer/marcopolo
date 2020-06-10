function wrapHandlerModule(module) {
  let moduleArr = Object.entries(module);
  let updatedFuncArr = moduleArr.map(([name, func]) => {
    return { [name]: wrapHandler(func, name) };
  });

  return updatedFuncArr.reduce((acc, item) => {
    acc = { ...acc, ...item };
    return acc;
  }, {});
}

function wrapHandler(handler, name) {
  return async (ctx) => {
    try {
      let requestMethod = ctx.request.method;
      let body = ctx.request.body;
      const response =
        requestMethod === "POST" || requestMethod === "PUT"
          ? await handler(body, ctx)
          : await handler(ctx);
      for (var key in response) {
        ctx[key] = response[key];
      }
    } catch (error) {
      console.log("error", error);
    }
  };
}

function OK(success, response, message) {
  return {
    status: 200,
    body: {
      success,
      message,
      response: response ? response : null,
    },
  };
}

function DUPLICATE_RECORD() {
  return {
    status: 409,
    body: {
      success: false,
      response: null,
    },
  };
}

module.exports = {
  wrapHandlerModule,
  OK,
  DUPLICATE_RECORD,
};
