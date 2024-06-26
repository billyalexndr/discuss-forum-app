const api = (() => {
    const BASE_URL = 'https://forum-api.dicoding.dev/v1';

    function putAccessToken(token) {
        localStorage.setItem('accessTokenForumApp', token);
    }

    function getAccessToken() {
        return localStorage.getItem('accessTokenForumApp');
    }

    async function fetchWithAuth(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
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
        const response = await fetchWithAuth(`${BASE_URL}/users/me`);

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

    async function getLeaderboards() {
        const response = await fetch(`${BASE_URL}/leaderboards`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { leaderboards } } = responseJson;

        return leaderboards;
    }

    async function getThreadDetail(id) {
        const response = await fetch(`${BASE_URL}/threads/${id}`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { detailThread } } = responseJson;

        return detailThread;
    }

    async function createThread({ title, body, category = '' }) {
        const response = await fetchWithAuth(`${BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                body,
                category,
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

    async function createComment({ id, content }) {
        const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { comment } } = responseJson;

        return comment;
    }

    async function toggleUpVoteComment(idThread, idComment) {
        const response = await fetchWithAuth(`${BASE_URL}/threads/${idThread}/comments/${idComment}/up-vote`, {
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

    async function toggleDownVoteComment(idThread, idComment) {
        const response = await fetchWithAuth(`${BASE_URL}/threads/${idThread}/comments/${idComment}/down-vote`, {
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

    async function toggleNeutralVoteComment(idThread, idComment) {
        const response = await fetchWithAuth(`${BASE_URL}/threads/${idThread}/comments/${idComment}/neutral-vote`, {
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

    async function toggleUpVoteThread(id) {
        const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
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
        const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
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

    async function toggleNeutralVoteThread(id) {
        const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
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
        getAllThreads,
        getLeaderboards,
        createThread,
        createComment,
        toggleUpVoteComment,
        toggleDownVoteComment,
        toggleNeutralVoteComment,
        toggleUpVoteThread,
        toggleDownVoteThread,
        toggleNeutralVoteThread,
        getThreadDetail,
    };
})();

export default api;
