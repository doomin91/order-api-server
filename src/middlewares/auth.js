import InvalidAuthorizedTokenError from '../exceptions/invalidAuthorizedTokenException';
import { verify, sign, refresh } from '../libs/jwt.js';
const bypassPathList = ['/login', '/', '/api/user/', '/api/user/refresh', 
      '/api-docs', 
      '/api-docs/', 
      '/api-docs/swagger-ui.css',
      '/api-docs/swagger-ui-bundle.js',
      '/api-docs/swagger-ui-standalone-preset.js',
      '/api-docs/swagger-ui-init.js',
      '/api-docs/swagger-ui-bundle.js',
      '/api-docs/swagger-ui-standalone-preset.js',
      '/api-docs/swagger-ui-init.js',
      '/api-docs/favicon-32x32.png',
      '/api-docs/favicon-16x16.png',
      '/api-docs/swagger-ui.css',
      '/api-docs/swagger-ui-bundle.js',
      '/api-docs/swagger-ui-standalone-preset.js',
      '/api-docs/swagger-ui-init.js',
      '/api-docs/swagger-ui-bundle.js',
      '/api-docs/favicon-32x32.png',
      '/api-docs/favicon-16x16.png'
    ]

export const verifyJWT = (req, res, next) => {
  const bearerToken = req.headers['x-access-token'];  
  try {
    if (bearerToken) {
      const token = bearerToken.replace(/^Bearer /, '');
      const user = verify(token);
      if (!user) {
        throw new Error('유저 정보가 존재하지 않습니다. 회원가입 후 이용해주세요.');
      }
      req.user = user;
    } else {
        const { path } = req;
        const found = bypassPathList.find((p) => p === path);
        if (!found) {
          throw new Error('AccessToken을 입력해주세요.');
        }
    }
    next();
  } catch (err) {
    next(
      new InvalidAuthorizedTokenError(err.message || 'Invalid Bearer Token'),
    );
  }
}
export const signing = (payload, option) => sign(payload, option);
export const refreshing = (payload, option) => refresh(payload, option);
