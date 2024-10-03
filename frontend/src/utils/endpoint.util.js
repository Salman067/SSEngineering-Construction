const apiEndpoint = {
    base: import.meta.env.VITE_API,
    auth: {
        signup: "/app/registration",
        login: "/app/login",
    },
    user: {
        getAll: "/user",
        getUserById: "/user/",
        getUserByUsername: "/user/profile/:id",
        update: "/user/:id",
        delete: "/user/:username",
    },

    blog: {
        getAll: "/app/list",
        create: "/blog/post",
        getSpecific: "/blog/view/:id",
        update: "/blog/:id",
        delete: "/blog/:id",
        getListByUser: "/app/list",
        getSearchResult: "/app/search/:query"
    },
};

export default apiEndpoint;