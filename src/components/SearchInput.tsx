import React, { useState, useMemo } from "react"
import styled from '@emotion/styled';
import { debounce } from "lodash"

interface Props {
    onSearch: (searchText: string, page: number, shouldSearch?: boolean) => void
}


const SearchInput = ({onSearch} : Props) => {
    const [text, setText] = useState("")
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const textValue = event.target.value.trimStart()
        setText(textValue)
        debouncedInputChange(textValue)
    }
    const debouncedInputChange = useMemo(
        () =>
          debounce((inputValue) => {
            onSearch(inputValue, 1);
          }, 1000),
        [onSearch]
      );

    return (
        <StyledWrapper>
            <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Search for books..."
          />
          <button type="button" onClick={() => onSearch(text, 1, true)}>Search</button>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div({
    display: "flex",
    alignItems: "center",
    gap: 10
})

export default SearchInput