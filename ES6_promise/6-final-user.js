import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const signUp = signUpUser(firstName, lastName);
  const upload = uploadPhoto(fileName);

  return Promise.allSettled([signUp, upload])
    .then((results) => {
      return results.map((result) => {
        if (result.status === 'fulfilled') {
          return {
            status: 'fulfilled',
            value: result.value,
          };
        } else {
          return {
            status: 'rejected',
            value: result.reason,
          };
        }
      });
    });
}
