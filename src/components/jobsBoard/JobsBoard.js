import {useState, useEffect} from "react";

import getJobs from "../../services/JobService";

import "./jobsBoard.scss";

const JobsBoard = (props) => {
    const [dataSet, setDataSet] = useState();


    useEffect(() => {  
        getJobs().then(({data}) => {
            setDataSet(data);
        })
    }, []);

    
    return (
        <div>
            {dataSet?.map((job, i) => {
                return <li key={i}>
                            <div className="jobs__item">
                                <img className="jobs__img" src={job.pictures[0]}/>
                                <div className="jobs__descr">
                                    <div className="jobs__descr__title">{job.title}</div>
                                    <div className="jobs__descr__text">{job.description}</div>
                                    <div className="content__descr__location__city">
                                        <div className="content__descr__location__city">{job.location.lat}</div>
                                        <div className="content__descr__location__countri">{job.location.long}</div>
                                    </div>
                                </div>
                                <div className="job__item__content__raiting"></div>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </li>
                })
            }
        </div>
    )

}

export default JobsBoard;
