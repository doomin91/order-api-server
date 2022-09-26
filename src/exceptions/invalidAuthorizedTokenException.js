import CommonException from './commonException';

/**
 * @description 404 Not found
 * 토큰 및 인증을 찾을 수 없습니다.
 */
export default class InvalidAuthorizedTokenError extends CommonException {
  constructor(message) {
    super(404, message);
  }
}
