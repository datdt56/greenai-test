import React from 'react';
import { Pagination, CircularProgress } from '@mui/material';
import { Book } from '../models/Book';
import styled from '@emotion/styled';
import { Meta } from '../models/Meta';

interface BookTableProps {
    books: Book[];
    meta: Meta
    onPageChange: (event: React.ChangeEvent<unknown> | null, page: number) => void
    loading?: boolean
}

const BookTable: React.FC<BookTableProps> = ({ books, meta, onPageChange, loading }) => {
    return (
        <StyledTableContainer>
            {
                loading && (
                    <div className='loader'>
                        <div className='circular-container'>
                            <CircularProgress />
                        </div>
                    </div>
                )
            }
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th className='w-140'>Edition Count</th>
                        <th className='w-140'>First Publish Year</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.author_name?.join(', ')}</td>
                            <td>{book.title}</td>
                            <td className='text-center'>{book.edition_count}</td>
                            <td className='text-center'>{book.first_publish_year ?? 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                page={meta.currentPage}
                count={meta.totalPages}
                onChange={onPageChange}
            />
        </StyledTableContainer>
    );
};

const StyledTableContainer = styled.div({
    position: "relative",
    minHeight: 200,
    "& .loader": {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: "rgb(0, 0, 0, .4)",
        "& .circular-container": {
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
        },
    },
    "& table": {
        width: "100%",
        borderCollapse: "collapse",
        "& td, & th": {
            border: "1px solid black",
            padding: 4
        },
        "& .w-140": {
            width: 140
        },
        "& .text-center": {
            textAlign: "center"
        }
    }
})

export default BookTable;