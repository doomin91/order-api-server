import CommonException from './commonException';

/**
 * @description 500 internal server error 
 * 서버에서 지원하지 않는 요청입니다.
 */
export default class BadRequestException extends CommonException {
  constructor(message) {
    super(500, message);
  }
}
