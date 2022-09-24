import { Router } from 'express';
import successWrapper from '../../libs/success';

export default class UserRoute {
  constructor (Component) {
    this.Component = Component
  }

  initializeRouter() {
    const router = Router();
    const path = '/user';
    router.post ('/',   successWrapper(this.Component.signUp))
    router.get  ('/me', successWrapper(this.Component.me))
    return { path, router }
  }
}
