// formValidations.js

export function validateEmail(email) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = 'Invalid email address';
  } else {
    errors.email = '';
  }
  return errors;
}

export function validatePassword(password) {
  const errors = {};
  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else {
    errors.password = '';
  }
  return errors;
}
