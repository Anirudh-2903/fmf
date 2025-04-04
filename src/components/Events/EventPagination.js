import Pagination from 'react-bootstrap/Pagination';

const EventPagination = ({ page = 1, updateFilters }) => {
  const itemsPerPage = 5;
  const currentPage = page;

  const paginationItems = Array.from({ length: itemsPerPage }, (_, index) => currentPage + index);

  const handlePageChange = (newPage) => {
    updateFilters({ page: newPage });
  };

  return (
    <Pagination>
      <Pagination.Prev 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}  
      />
      {paginationItems.map((item) => (
        <Pagination.Item
          key={item}
          active={currentPage === item}
          onClick={() => handlePageChange(item)}
          linkStyle={{
            backgroundColor: page === item ? '#7800ff' : 'transparent',
            color: page === item ? 'white' : 'black',
            border: page === item ? '1px solid #7800ff' : '1px solid transparent',
          }}
        >
          {item}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
    </Pagination>
  );
};

export default EventPagination;
