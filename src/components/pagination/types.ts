export interface PropTypes {
  totalCount: number;
  pagePerCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
