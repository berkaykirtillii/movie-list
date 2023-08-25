import axios from "axios";
import { useEffect, useState } from "react";

const omdbBaseUrl = process.env.REACT_APP_MOVIE_BASE_URL;

const useFetchMovies = (filterParams, pageNumber ) => {
    const [data, setData] = useState(null);
    const [totalResults,setTotalResults] = useState(0)

    useEffect(() => {
        let requestParams = {
            y: filterParams?.year,
            page: pageNumber,
            plot: filterParams?.plot
        };

        if(filterParams?.movieType === "episode" || filterParams?.plot) {
            requestParams = {
                ...requestParams,
                t: filterParams?.title,
                Season: filterParams?.season,
                Episode: filterParams?.episode
            }
        }
        else {
            requestParams = {
                ...requestParams,
                s: filterParams?.title,
                type: filterParams?.movieType,
            }
        }

        axios.get(omdbBaseUrl, { params: requestParams })
            .then((res) => {
                const data = res.data.Search
                setData(Array.isArray(data) ? data : [data])
                setTotalResults(parseInt(res.data.totalResults))
            });

    }, [filterParams, pageNumber]);

    return {data, totalResults};
};
export default useFetchMovies;
