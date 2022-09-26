import CommonException from './commonException';

/**
 * @description 422(Unprocessable Entity) 
 * 허용되지 않는 요청 값입니다. 올바른 값을 입력해주세요.
 */
export default class ValidationException extends CommonException {
  constructor(error) {
    if(error.details){
      let message = []
      error.details.forEach( (e) => {
        message.push(e.message.replaceAll('\"', ''))
      })
      super(422, message);
    } else {
      super(422, error);
    }
  }
}
