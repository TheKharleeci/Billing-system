import {
    devENV, testENV
  } from './env';
  
const NODE_ENV = process.env.NODE_ENV;  
    
  export default {
    test: testENV,
    development: devENV,
  }[NODE_ENV || 'development'];
  