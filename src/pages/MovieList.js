import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFetchMovies from "../hooks/useFetchMovies";
import SearchBar from "../components/SearchBar";
import DetailModal from "../components/DetailModal";

const MovieList = () => {
    const { t } = useTranslation();

    const [filterParams, setFilterParams] = useState({title: "pokemon"});
    const [pageNumber,setPageNumber] = useState(1)

    const {data, totalResults, isLoading} = useFetchMovies(filterParams,pageNumber);

    const columns = [
        {
            title: t("name"),
            dataIndex: "Title",
            key: "movie-name",
            width:"400px",
            render: (name) => <DetailModal name={name}/>
        },
        {
            title: t("released"),
            dataIndex: "Year",
            key: "year",
            width:"100px",
        },
        {
            title: t("type"),
            dataIndex: "Type",
            key: "type",
            width:"100px",
        },
        {
            title: t("imdb-id"),
            dataIndex: "imdbID",
            key: "imdb-id",
            width:"100px",
        },
    ];

     useEffect(() => {
        setPageNumber(1)
    },[filterParams])

    return (
        <Space direction="vertical">
            <SearchBar filter={setFilterParams} params={filterParams} />
            <Table columns={columns} 
                   dataSource={data}
                   size="small" 
                   rowKey={"imdbID"}
                   laoding={isLoading}
                   pagination={{
                        current: pageNumber,
                        showSizeChanger: false,
                        total:totalResults,
                        onChange: (pageNumber) => setPageNumber(pageNumber)
                    }}
            />
        </Space>
    );
};

export default MovieList;
