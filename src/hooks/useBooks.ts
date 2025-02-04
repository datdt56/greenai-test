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
  averageDuration: 0,
};

const useBooks = () => {
  const [tableData, setTableData] = useState<{
    books: Book[];
    meta: Meta;
    averageDuration: number;
  }>(INITIAL_TABLE_DATE);
  const [loading, setLoading] = useState(false);
  const searchTextRef = useRef("");
  const controllerRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(
    async (searchTerm = searchTextRef.current, page?: number) => {
      if (searchTerm === searchTextRef.current && !page) return;

      const controller = new AbortController();
      const signal = controller.signal;

      const currentController = controllerRef.current;
      if (currentController) {
        currentController.abort();
      }

      controllerRef.current = controller;

      try {
        setLoading(true);
        const startTime = performance.now();
        const response = await axios.get(
          `${OPEN_SEARCH_API_URL}?q=${searchTerm}&fields=key,title,author_name,edition_count,first_publish_year&page=${
            page ?? 1
          }&limit=${ITEMS_PER_PAGE}`,
          { signal }
        );
        searchTextRef.current = searchTerm;
        const endTime = performance.now();
        const averageDuration = endTime - startTime;
        const { docs = [], numFound = 0, start = 0 } = response.data || {};

        setTableData({
          books: docs,
          meta: {
            totalPages: numFound ? Math.ceil(numFound / 10) : 0,
            currentPage: numFound ? start / ITEMS_PER_PAGE + 1 : 0,
          },
          averageDuration,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetTable = useCallback(() => setTableData(INITIAL_TABLE_DATE), []);

  return { tableData, loading, handleSearch, resetTable };
};

export default useBooks;
