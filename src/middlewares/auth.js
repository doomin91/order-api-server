import InvalidAuthorizedTokenError from '../exceptions/invalidAuthorizedTokenException';
import { verify, sign } from '../libs/jwt.js';
const bypassPathList = ['/login', '/', '/api/user/', 
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
        throw new Error();
      }
      req.user = user;
    } else {
      const { path } = req;
      const found = bypassPathList.find((p) => p === path);
      if (!found) {
        throw new Error();
      }
    }
    next();
  } catch (err) {
    next(
      new InvalidAuthorizedTokenError(err.message || 'Invalid Bearer Token'),
    );
  }
};
export const signing = (payload, option) => sign(payload, option);
