export default function handleResponseFromAPI(promise) {
  return new Promise((resolve, reject) => {
    if (promise) {
      resolve();
    } else {
      reject(new Error({}));
    }
  }).then(() => ({ status: 200, body: 'Success' }))
    .finally(() => {
      console.log('Got a response from the API');
    }).catch(() => ({}));
}
