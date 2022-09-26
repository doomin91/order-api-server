import CommonException from './commonException';

/**
 * @description 401 Unauthorized, 인증되지 않은 혹은 만료된 토큰입니다.
 * */ 
export default class ExpiredTokenException extends CommonException {
  constructor(message) {
    super(401, message);
  }
}
