import shortid from 'shortid';

import corporateData from '../data/corporateData';

export function addDepartment() {
  const action = 'add department';

  return fakeServerResponse(action);
}

export function addEmployee() {
  const action = 'add employee';

  return fakeServerResponse(action);
}

export function deleteDepartment() {
  const action = 'delete department';

  return fakeServerResponse(action);
}

export function deleteEmployee() {
  const action = 'delete employee';

  return fakeServerResponse(action);
}

export function editEmployee() {
  const action = 'edit employee';

  return fakeServerResponse(action);
}

function fakeServerResponse(action) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve({ status: 'ok' });
      } else {
        reject({ errors: [{
          id: shortid.generate(),
          message: `Cannot ${action}. Server issues. Try again later.`,
        }] });
      }
    }, 300);
  });

  return promise;
}

export function fetchCorporateData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve(corporateData);
      } else {
        reject({ errors: [{ id: shortid.generate(), message: 'Cannot load data from server.' }] });
      }
    }, 300);
  });
  return promise;
}

export function login(userData) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.username === 'admin' && userData.password === 'admin') {
        resolve({ username: 'admin', role: 'admin' });
      } else {
        reject({ errors: [{ id: shortid.generate(), message: 'Incorrect username or password' }] });
      }
    }, 300);
  });

  return promise;
}
