import { useState, useRef, useCallback } from "react";
import axios from "axios";
import { Book } from "../models/Book";
import { Meta } from "../models/Meta";
import { ITEMS_PER_PAGE, OPEN_SEARCH_API_URL } from "../configs/apiConfig";

const INITIAL_TABLE_DATE = {
  books: [],
  meta: {
    currentPage: 0,
    totalPages: 0,
  },
  totalApiCallDuration: 0,
  apiCallCount: 0
};

const useBooks = () => {
  const [tableData, setTableData] = useState<{
    books: Book[];
    meta: Meta;
    totalApiCallDuration: number;
    apiCallCount: number;
  }>(INITIAL_TABLE_DATE);
  const [loading, setLoading] = useState(false);
  const searchTextRef = useRef("");
  const controllerRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(
    async (searchTerm = searchTextRef.current, page: number, shouldSearch?: boolean) => {
      if (searchTerm === searchTextRef.current && !shouldSearch) return;
      const controller = new AbortController();
      const signal = controller.signal;

      if (controllerRef.current) {
        controllerRef.current.abort();
      }
            
      controllerRef.current = controller;

      try {
        setLoading(true);
        const startTime = performance.now();
        const response = await axios.get(
          `${OPEN_SEARCH_API_URL}?q=${encodeURIComponent(searchTerm)}&fields=key,title,author_name,edition_count,first_publish_year&page=${page}&limit=${ITEMS_PER_PAGE}`,
          { signal }
        );
        searchTextRef.current = searchTerm;
        const endTime = performance.now();
        const duration = endTime - startTime;
        const { docs = [], numFound = 0 } = response.data || {};

        setTableData((prev) => ({
          books: docs,
          meta: {
            totalPages: numFound ? Math.ceil(numFound / 10) : 0,
            currentPage: numFound ? page : 0,
          },
          totalApiCallDuration: prev.totalApiCallDuration + duration,
          apiCallCount: prev.apiCallCount + 1,
        }));
      } catch (error) {
        console.error(error)
      } finally {
        if (controllerRef.current === controller) {
          setLoading(false);
        }
      }
    },
    []
  );

  const resetTable = useCallback(() => setTableData(INITIAL_TABLE_DATE), []);

  return { tableData, loading, handleSearch, resetTable };
};

export default useBooks;
