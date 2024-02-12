'use client'
import { useState, useEffect } from 'react';
import fetchData from './../lib/fetchData';

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL_SHORT}/users`);
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useFetchUsers;
