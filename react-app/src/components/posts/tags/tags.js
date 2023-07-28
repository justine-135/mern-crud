const Tags = ({ filterTags, setFilterTags }) => {
  const handleTagRemove = (tag) => {
    setFilterTags(
      filterTags.filter((filterTag) => {
        return filterTag !== tag;
      })
    );
  };
  const handleClearFilterTags = () => {
    setFilterTags([]);
  };
  return (
    <div className="filtertags-container">
      {filterTags.length !== 0 && (
        <div className="filtertags-flex">
          <div className="filtertags">
            {filterTags.map((tag, index) => {
              return (
                <div key={index}>
                  <button onClick={() => handleTagRemove(tag)}>{tag}</button>
                </div>
              );
            })}
          </div>
          <button className="clear-btn" onClick={handleClearFilterTags}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
