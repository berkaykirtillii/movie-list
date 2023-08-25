import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const omdbBaseUrl = process.env.REACT_APP_MOVIE_BASE_URL;

const DetailModal = ({ name }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data,setData] = useState(null)
    
    useEffect(() => {
        if(isModalOpen){
            axios.get(omdbBaseUrl, { params: {t: name, plot: "full"} })
            .then((res) => {
                setData(res.data)
            });
        }
    },[name, isModalOpen])

    return (
        <>
            <div className="movie-name" onClick={() => setIsModalOpen(true)}>
                {name}
            </div>
            {
                data ? 
                <Modal
            title={t("detail")}
            open={isModalOpen}
            okButtonProps={{ className: "d-none" }}
            onCancel={() => setIsModalOpen(false)}
            >
            <Row>
                <Col span={12}>
                    <img
                        className={"detail-poster"}
                        src={data?.Poster}
                        alt="name"
                    />
                </Col>
                <Col span={11}>
                    <p> {t("name")}: {name}</p>
                    <p> {t("time")}: {data?.Runtime}</p>
                    <p> {t("director")}: {data?.Director}</p>
                    <p> {t("actors")}: {data?.Actors}</p>
                    <p> {t("imdb-rating")}: {data?.imdbRating}</p>                   
                    <p> {t("released")} : {data?.Year}</p>
                    <p> {t("type")}: {data?.Type} </p>
                    <p> imdbID: {data?.imdbID}</p>
                </Col>
            </Row>
        </Modal>
            :
            <Modal
            title={t("detail")}
            open={isModalOpen}
            okButtonProps={{ className: "d-none" }}
            onCancel={() => setIsModalOpen(false)}
            >
                <div className="d-flex-center">
                <LoadingOutlined/>
                </div>
                </Modal>}
            
        </>
    );
};

export default DetailModal;
