import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "./components/Header";
import BookTable from "./components/BookTable";
import SearchInput from "./components/SearchInput";
import useBooks from "./hooks/useBooks";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const { tableData, loading, handleSearch, resetTable } = useBooks();

  const handlePageChange = (event: unknown, page: number) => {
    handleSearch(undefined, page, true);
  };

  const handleLogin = () => {
    setUsername("User1");
  };

  const handleLogout = () => {
    setUsername("");
    resetTable();
  };

  return (
    <StyledWrapper>
      <Header
        username={username}
        averageDuration={tableData.apiCallCount ? (tableData.totalApiCallDuration / tableData.apiCallCount).toFixed(2) : '0'}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
      {username ? (
        <div className="main-content">
          <SearchInput  onSearch={handleSearch}/>.
          <BookTable
            books={tableData.books}
            meta={tableData.meta}
            onPageChange={handlePageChange}
            loading={loading}          
          />
        </div>
      ) : (
        <p className="warning-message">Please log in to search for books.</p>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div({
  "& .main-content": {
    padding: 10,
  },
  "& .warning-message": {
    fontWeight: 700,
    textAlign: "center",
  },
});

export default App;
