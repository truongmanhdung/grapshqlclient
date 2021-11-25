import React, { useState } from 'react'
import { Table, Button, Spin} from 'antd';
import { useQuery } from '@apollo/client';
import { getBooks } from '../../../graphql-client/query';
import { Link } from 'react-router-dom';
interface Props {

}

const columns = [
    {
        title: 'Tên sách',
        dataIndex: 'name',
    },
    {
        title: 'Thể loại truyện',
        dataIndex: 'genre',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Mô tả',
        dataIndex: 'des',
    },
    {
        title: 'Tên tác giả',
        dataIndex: 'author',
    },    
    {
        title: 'Action',
        dataIndex: 'btnEdit',
    },    
];



const Book: React.FC = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([])
    const { loading, error, data } = useQuery(getBooks)
    console.log(data);
    
    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }
    const start = () => {
        setTimeout(() => {
            setSelectedRowKeys([]);
        }, 1000);
    };

    const data1: any[] | undefined = [];
    for (let i = 0; i < data.books.length; i++) {
        const link = 'editbook/' + data.books[i].id
        data1.push({
            key: data.books[i].id,
            name: data.books[i].name,
            genre: data.books[i].genre,
            image: <img src={data.books[i].image} width="100" alt="" />,
            des: data.books[i].des,
            author: data.books[i].author.name,
            btnEdit: <Button type="primary"><Link to={link}>Sửa sản phẩm</Link></Button>,
        });
    }

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const onRemove = () => {
        if(window.confirm('Are you sure you want to remove')){
            console.log('id', selectedRowKeys)
        }
    }

    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={false}>
                    Bỏ chọn
                </Button>
                <Button danger style={{ marginLeft: 20}} type="primary" onClick={onRemove} disabled={!hasSelected} loading={false}>
                    Xóa
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data1} />
        </div>
    )
}
export default Book