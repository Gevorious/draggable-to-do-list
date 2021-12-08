const SearchBar = ({ onChange }) => {
  return (
    <div className="search-bar">
      <input type="text" onChange={onChange} placeholder="Search for a task" />
      <span className="search-btn"></span>
    </div>
  );
};

export default SearchBar;
