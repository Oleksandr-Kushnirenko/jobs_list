import {useState, useEffect, useMemo} from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useJobService from "../../services/JobService";

import "./jobsBoard.scss";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner/>;
        case "loading":
            return newItemLoading ? <Component/> : <Spinner/>;
        case "confirmed":
            return <Component/>   
        case "error":
            return <ErrorMessage/>;
        default:
            throw new Error("Unexpected process state");
    }
} 

const JobsBoard = (props) => {
    const [jobsBoard, setJobsBoard] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false); // загрузка вызывается вручную (при клике на индикатор - вызове onRequest)
    const [offset, setOffset] = useState(0);
    const [jobEnded, setJobEnded] = useState(false);

    const {getAllJobs, process, setProcess} = useJobService();

    useEffect(() => {    // компонент только создан на странице, первый раз отрендерился
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {          // метод, который отвечает за запрос на сервер
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllJobs(offset)
            .then(onJobListLoaded)
            .then(() => setProcess("confirmed"));
    }

    const onJobListLoaded = async(newJobList) => {
        let ended = false;
        if (newJobList.length < 15) {
            ended = true;
        }
        setJobsBoard([...jobsBoard, ...newJobList]);
        setNewItemLoading(false);
        setOffset(offset + 15);
        setJobEnded(ended);
    }
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li 
                    className="job__item"
                    tabIndex={0}>
                        <div className="job__item__content">
                            <img src="../../resources/hospital.png" />
                            <div className="job__item__content__description">
                                <div className="job__item__content__description__title">
                                    Arbeitsmediziner/-in / Betriebsmediziner/-in (m/w/d) oder einen Arzt/eine Ärztin (m/w/d) für die Weiterbildung zum Facharzt/ zur Fachärztin für Arbeitsmedizin (m/w/d)
                                </div>
                                <div className="job__item__content__description__description">
                                    Department name •  Allgemeines Krankenhaus der Stadt Wien - AKH
                                </div>
                                <div className="job__item__content__description__location">
                                    Vienna, Austria
                                </div>
                            </div>
                            <div className="job__item__content__raiting"></div>
                        </div>

                </li>
            )
        });
        
        return (
            <ul className="job__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(jobsBoard), newItemLoading);

    }, [process]);

    return (
        <div className="job__list">
            {elements}
        </div>
    )

}

export default JobsBoard;
