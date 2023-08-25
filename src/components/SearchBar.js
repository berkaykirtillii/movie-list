import { InputNumber, Select, Space } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { useTranslation } from "react-i18next";

const SearchBar = ({ params, filter }) => {
    const { t } = useTranslation();

    const changeParams = (param,filterType) => { 
        filter((prevState) => ({ ...prevState, [filterType]: param }));
    };

    return (
         <Space className="d-flex-center">
            <Search
                className="w-200"
                placeholder={t("input-search-text")}
                allowClear
                defaultValue={params?.title}
                onSearch={(search)=> changeParams(search, "title")}
            />
            <Select
                className="w-150"
                allowClear
                placeholder={t("type")}
                options={[
                    {
                        value: "movie",
                        label: t("movie"),
                    },
                    {
                        value: "series",
                        label: t("series"),
                    },
                    {
                        value: "episode",
                        label: t("series-episodes"),
                    },
                ]}
                onChange={(selected)=>changeParams(selected,"movieType")}
            />
            {params.movieType === "episode" ? 
              <>
                <InputNumber min={1} 
                             placeholder={t("season")}
                             onChange={(season)=>changeParams(season,"season")}/>
                <InputNumber min={1} 
                             placeholder={t("episode")}
                             onChange={(episode)=>changeParams(episode,"episode")}/>
              </>
            : <></>}
            <InputNumber min={1895} 
                         max={new Date().getFullYear()}
                         placeholder={t("released")}
                         onChange={(year)=>changeParams(year,"year")}/>
        </Space>
    );
};

export default SearchBar;
