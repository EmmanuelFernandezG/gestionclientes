const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    if (currentUser !== null) {
      Alert.alert(
        'Success!',
        `${currentUser.get('username')} is the current user!`,
      );
    }
    return currentUser;
  };

  export default getCurrentUser;