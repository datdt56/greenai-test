# Book Search App

This is a simple React application that allows users to search for books using the Open Library Search API.

## Features

- *User Authentication*: A header that shows the user's authentication status, with options to log in and out.
- *Debounced Search*: A search input that triggers a book search with a debounce effect and enhancement to reduce the number of API calls made to the Open Library API.
- *Average Search Duration*: The application displays the average duration of the last search, providing feedback on how long the API call took to complete.
- *Results Table*: A table displaying the search results, including:
  - Author names
  - Book titles
  - Edition count
  - First publishing year
- *Pagination*: Results are displayed with pagination, allowing users to navigate through pages of search results.
- *Mock Authentication System*: Simple client-side authentication is implemented for demonstration purposes.

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)

### Clone the repository

```bash
git clone https://github.com/datdt56/greenai-test.git
cd greenai-test
```

### Install the dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

- Open your web browser and navigate to http://localhost:5173 to access the application.


