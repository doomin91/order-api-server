export const successWrapper = (handler) => async (req, res, next) => {
  // TODO 공통 Exception 코드를 작성 해주세요.
  try {
    const response = await handler(req, res, next);
    console.log(res.statusCode)
    res.json(response);
    next();
  } catch (err) {
    next(err);
  }
};
export default successWrapper;
