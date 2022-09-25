import CommonException from './commonException';

export default class expiredTokenException extends CommonException {
  constructor(message) {
    super(403, message);
  }
}
