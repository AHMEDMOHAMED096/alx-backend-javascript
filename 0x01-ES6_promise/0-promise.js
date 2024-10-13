function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    const success = true;
    if (success) {
      resolve('response received');
    } else {
      reject(Error, 'request failed');
    }
  });
}

getResponseFromAPI()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
