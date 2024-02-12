const fetchData = async (url, options = {}) => {
    const token = localStorage.getItem('jwtToken');
    const headers = new Headers({
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    });

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    return response.json();
};

export default fetchData;
