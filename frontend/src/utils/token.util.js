
const getAccessToken = () => {
    const token = localStorage.getItem("UserToken");
    return token;
}

const storeAccessToken = (UserToken) => {
    localStorage.setItem('UserToken', UserToken);
};

const removeAccessToken = () => {
    localStorage.removeItem('UserToken');
};

export { getAccessToken, storeAccessToken, removeAccessToken };
