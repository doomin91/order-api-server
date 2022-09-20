// 'use strict'
import express from "express";

const router = express.Router();
import userComponent from "../api/user/component";

const UserComponent = new userComponent
// import orderController from "../api/order/service";

    /**
     * @swagger
     *  /api/auth/login:
     *    post:
     *      tags:
     *      - auth
     *      description: username과 password로 API에 로그인합니다. token을 return합니다.
     *      parameters:
     *      - in: body
     *        name: Request
     *        schema:
     *          $ref: '#/definitions/login'
     *      responses:
     *        200:
     *          description: Successfully login
     *          schema:
     *            properties:
     *              status:
     *                type: string
     *              data:
     *                type: object
     *                properties:
     *                  auth:
     *                    type: boolean
     *                  token:
     *                    type: string
     *                  faId:
     *                    type: string
     *                  roles:
     *                    type: string
     */
     
    router.get("/api/user/findUserByPhone",               UserComponent.signUp), 
    
router.get('/', (req, res) => {
    res.send('404 . Not Found!')
  })

export default router;
