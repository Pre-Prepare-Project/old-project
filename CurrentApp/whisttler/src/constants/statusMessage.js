require('express');
/**
 * Different Status Messages to send with API
 * */
 const admin="admin";
 const brand="brand";
 const influencer="influencer";

const ERROR_403 = {message:'Unauthorised Access.'};
 const ERROR_404 = {message:'Page Not Found.'};
 const ERROR_500 = {message:'Internal Server Error.'};

/**
 * Auth Responses
 * */

 const WRONG_CREDENTIALS = {message: 'Username and Password did not match.'};
 const EMAIL_ALREADY_EXIST = {message:'E-mail id already exist.'};
const PHONE_ALREADY_EXIST = {message: 'Phone No. already exist.'};
const USER_ALREADY_EXIST = {message: 'Username. already exist.'};

module.exports = {
ERROR_403:ERROR_403,
ERROR_404:ERROR_404,
ERROR_500:ERROR_500,
WRONG_CREDENTIALS:WRONG_CREDENTIALS,
EMAIL_ALREADY_EXIST:EMAIL_ALREADY_EXIST,
PHONE_ALREADY_EXIST:PHONE_ALREADY_EXIST,
USER_ALREADY_EXIST:USER_ALREADY_EXIST,
admin:admin,
brand:brand,
influencer:influencer
};
