import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

function PaginationView({ page, handleCallback }) {
  let items = [];
  const [currentNum, setCurrentNum] = useState(1);

  for (let number = 1; number <= page.totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentNum}
        onClick={() => setCurrentNum(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    handleCallback(currentNum);
  });

  return <Pagination className="justify-content-center">{items}</Pagination>;
}

export default PaginationView;
