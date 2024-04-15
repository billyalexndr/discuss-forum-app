const api = (() => {
    const BASE_URL = 'https://forum-api.dicoding.dev/v1';

    async function _fetchWithAuth(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }

    function putAccessToken(token) {
        localStorage.setItem('accessTokenForumApp', token);
    }

    function getAccessToken() {
        return localStorage.getItem('accessTokenForumApp');
    }

    async function register({ name, email, password }) {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { user } } = responseJson;

        return user;
    }

    async function login({ email, password }) {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { token } } = responseJson;

        return token;
    }

    async function getOwnProfile() {
        const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { user } } = responseJson;

        return user;
    }

    async function getAllUsers() {
        const response = await fetch(`${BASE_URL}/users`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { users } } = responseJson;

        return users;
    }

    async function getUserNameById(userId) {
        const response = await fetch(`${BASE_URL}/users`);
        const responseJson = await response.json();

        const { status, message, data } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { users } = data;
        const user = users.find(user => user.id === userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user.name;
    }


    async function getAllThreads() {
        const response = await fetch(`${BASE_URL}/threads`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { threads } } = responseJson;

        return threads;
    }

    async function getThreadDetail(id) {
        const response = await fetch(`${BASE_URL}/threads/${id}`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { threadDetail } } = responseJson;

        return threadDetail;
    }

    async function createThread({ title, body, category = '' }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                replyTo,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { thread } } = responseJson;

        return thread;
    }

    async function toggleUpVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    async function toggleDownVoteThread(id) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
    }

    return {
        putAccessToken,
        getAccessToken,
        register,
        login,
        getOwnProfile,
        getAllUsers,
        getUserNameById,
        getAllThreads,
        createThread,
        toggleUpVoteThread,
        toggleDownVoteThread,
        getThreadDetail,
    };
})();

export default api;