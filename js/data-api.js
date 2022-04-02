const FROM_SERVER = 'https://25.javascript.pages.academy/kekstagram/data';

const getUsersData = (onRecived, onError) => {
  fetch(FROM_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onRecived(data);
    })
    .catch((err) => {
      onError(err);
    });
};

export {getUsersData};
