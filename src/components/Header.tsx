import React from 'react';
import styled from '@emotion/styled'

interface Props {
    username: string;
    averageDuration: number;
    onLogout: () => void;
    onLogin: () => void;
}

const Header: React.FC<Props> = ({ username, averageDuration, onLogout, onLogin }) => {
    return (
        <StyledHeader>
            <h1>Book Search</h1>
            <div>
                <div className='authentication-status'>
                    <span>{username ? `Welcome, ${username}` : 'Please Login'}</span>
                    {username ? (
                        <button onClick={onLogout}>Logout</button>
                    ) : (
                        <button onClick={onLogin}>Login</button>
                    )}
                </div>
                <span>Average Search Duration: {averageDuration} ms</span>
            </div>
        </StyledHeader>
    );
};

const StyledHeader = styled.header({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 12,
    "& .authentication-status": {
        display: "flex",
        alignItems: "center",
        gap: 10
    }
})

export default Header;