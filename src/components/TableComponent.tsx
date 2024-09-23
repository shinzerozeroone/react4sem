import { Table, Spin  } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import {Link} from "react-router-dom"

const TableComponent = () => {
  interface DataType {
    country: string;
    name: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Страна',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Название школы',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const LIMIT_LIST_SCHOOL = 10; 
  const containerRef = useRef<HTMLDivElement>(null);

  
  const getUniversity = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * LIMIT_LIST_SCHOOL;
    const response = await axios.get(
      `http://universities.hipolabs.com/search?offset=${offset}&limit=${LIMIT_LIST_SCHOOL}`
    );
    setDataSource((prev) => [...prev, ...response.data]); 
    setLoading(false);
  };

  
  useEffect(() => {
    getUniversity(page);
  }, [page]);

 
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        
        setPage((prevPage) => prevPage + 1);
      }
    }
  };


  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [loading]);

  return (
    <>
    <div ref={containerRef} style={{ height: '80vh', overflow: 'auto' }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false} 
        rowKey="name" 
      />
      {loading && (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <Spin /> 
        </div>
      )}
    </div>

    <Link to={'/'}><button>To PDF Form</button></Link>
  </>
  );
};

export default TableComponent;
