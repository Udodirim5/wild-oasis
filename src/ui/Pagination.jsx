/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_LIMIT } from "../constants/queryKeys";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;


const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = searchParams.get("limit") || PAGE_LIMIT;
  const offset = (currentPage - 1) * limit;
  const totalPages = Math.ceil(count / limit);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const nextPage = () => {
    const next = currentPage === totalPages ? totalPages : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };
  const previousPage = () => {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", previous);
    setSearchParams(searchParams);
  };

  if (count <= limit) return null;

  return (
    <StyledPagination>
      <P>
        <span>{offset + 1}</span> to{" "}
        <span>{Math.min(offset + Number(limit), count)}</span> of{" "}
        <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={previousPage} disabled={isFirstPage}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={isLastPage}>
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
