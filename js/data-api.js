const FROM_SERVER = 'https://25.javascript.pages.academy/kekstagram/data';
const TO_SERVER = 'https://25.javascript.pages.academy/kekstagram';

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

const uploadUserData = (onSuccess, onError, userForm) => {
  fetch(TO_SERVER,
    {
      method: 'POST',
      body: userForm,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch((err) => {
      onError(err);
    });
};

export {getUsersData, uploadUserData};
