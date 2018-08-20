// import * as enzyme from "enzyme";
// import * as React from "react";
import { isEmailValid, isPasswordValid } from '../components/signin/SignIn';

const passingEmailCases = [
  'peter@microsoft.com',
  'steve.creek@mydomain.net',
  'email@domain.com',
  'firstname.lastname@domain.com',
  'email@subdomain.domain.com',
  'firstname+lastname@domain.com',
  'email@123.123.123.123',
  '1234567890@domain.com',
  'email@domain-one.com',
  '_______@domain.com',
  'email@domain.name',
  'email@domain.co.jp',
  'firstname-lastname@domain.com',
];

// https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
// these cases should pass but fail nonetheless. Documented here as known.
const shouldPassEmailCases = ['email@[123.123.123.123]', '"email"@domain.com'];

const failingEmailCases = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@domain.com',
  'Joe Smith <email@domain.com>',
  'email.domain.com',
  'email@domain@domain.com',
  '.email@domain.com',
  'email.@domain.com',
  'email..email@domain.com',
  'あいうえお@domain.com',
  'email@domain',
  'email@-domain.com',
  'email@domain..com',
];

// https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
// these cases should fail but pass nonetheless. Documented here as known.
const shouldFailEmailCases = [
  'email@domain.com (Joe Smith)',
  'email@domain.web',
  'email@111.222.333.44444',
];

const passingPasswordCases = ['Aa11%$cccc', 'g$jkKK44Q!'];

const failingPasswordCases = ['test', 'testing123'];

passingEmailCases.forEach((email) => {
  it(`validates ${email}`, () => {
    expect(isEmailValid(email)).toEqual(true);
  });
});

shouldPassEmailCases.forEach((email) => {
  it(`should validate ${email} but rejects`, () => {
    expect(isEmailValid(email)).toEqual(false);
  });
});

failingEmailCases.forEach((email) => {
  it(`rejects ${email}`, () => {
    expect(isEmailValid(email)).toEqual(false);
  });
});

shouldFailEmailCases.forEach((email) => {
  it(`should reject ${email} but validates`, () => {
    expect(isEmailValid(email)).toEqual(true);
  });
});

passingPasswordCases.forEach((password) => {
  it(`validates ${password}`, () => {
    expect(isPasswordValid(password)).toEqual(true);
  });
});

failingPasswordCases.forEach((password) => {
  it(`rejects ${password}`, () => {
    expect(isPasswordValid(password)).toEqual(false);
  });
});
