export interface PropTypes {
  options: Record<string, string>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
