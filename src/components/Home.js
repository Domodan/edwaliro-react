import Header from './include/Header';
import Footer from './include/Footer';
import Title from './include/Title';
import moment from 'moment';
import Timer from './include/Timer';

import { useState, useEffect, useRef } from 'react';
import { getThingspeakFeedsData } from '../services/getData';

import imageTemp from './images/temperature.jpg';
import imageBodyTemp from './images/body-temperature.jpg';
import imagePulse from './images/pulse.jpg';

const Home = (props) => {
    const [temperature, setTemperature] = useState(0);
    const [bodyTemperature, setBodyTemperature] = useState(36.5);
    const [oxygenSaturation, setOxygenSaturation] = useState(98);
    const [lastUpdated, setLastUpdated] = useState(0);
    const timeElapsed = useRef(0);

    useEffect(() => {
        getThingspeakFeedsData()
        .then((data) => {
            // const temp = Math.round((26 + Math.random() * (30-26)) * 10)/10;
            // setTemperature(temp);
            setTemperature(data.feeds[0].field1);
            console.log("Temperature:", data.feeds[0].field1);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });

        let today = new Date();
        let startTime = moment(today.getTime());
        setLastUpdated(startTime.seconds());

        // console.log("Day:", startTime.days());
        // console.log("Hours:", startTime.hours());
        // console.log("Minutes:", startTime.minutes());
        // console.log("Seconds:", startTime.seconds());

        const realTimeData = setInterval(() => {
            getThingspeakFeedsData()
            .then((data) => {
                setBodyTemperature(data.feeds[0].field5);
                setOxygenSaturation(data.feeds[0].field4);
                setTemperature(data.feeds[0].field1);
                console.log("Body Temperature:", data.feeds[0].field5);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
            
            today = new Date();
            startTime = moment(today.getTime());
            let seconds = startTime.seconds();
            if(seconds > 10) {
                seconds = seconds - timeElapsed.current;
            }
            setLastUpdated(seconds);
            
            // const bodyTemp = Math.round((34 + Math.random() * (37-34)) * 10)/10;
            // setBodyTemperature(bodyTemp);
            // const temp = Math.round((26 + Math.random() * (30-26)) * 10)/10;
            // setTemperature(temp);
            // const oxygenSat = Math.round((90 + Math.random() * (100-90)));
            // setOxygenSaturation(oxygenSat);

        }, 10 * 1000);
        
        return() => {
            clearInterval(realTimeData);
        }

    }, []);
    
    return (
        <main className="container py-1">
            <Title title={props.title} />
            <Header />

            <hr className="mt-5 mb-3" />

            <div className="text-center">
                <h2 className="blog-post-title">Realtime Data</h2>
                <Timer />
            </div>

            <hr className="mt-4 mb-5" />

            <form>
                <input type="hidden" name="timeElapsed" value={timeElapsed.current = lastUpdated} />
            </form>

            <div className="row row-cols-1 row-cols-md-3 g-2">
                <div className="col">
                    <div className="card h-100">
                        <div className="text-center">
                            <img src={ imageTemp } style={{width : "150px", height : "150px"}} className="card-img-top img-fluid" alt="Atmospheric Temperature" />
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                    <span className="fw-bold fs-4">Temperature:</span>
                                </div>
                                <div className="p-2 bd-highlight">
                                    <p className="fw-light fs-4">{ temperature }<span>&#176;</span>C</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last Update: { lastUpdated } seconds ago</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="text-center">
                            <img src={ imageBodyTemp } style={{width : "150px", height : "150px"}} className="card-img-top" alt="Body Temperature" />
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                    <span className="fw-bold fs-4">Body Temperature:</span>
                                </div>
                                <div className="p-2 bd-highlight">
                                    <p className="fw-light fs-4">{ bodyTemperature }<span>&#176;</span>C</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last Update: { lastUpdated } seconds ago</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="text-center">
                            <img src={ imagePulse } style={{width : "150px", height : "150px"}} className="card-img-top" alt="Pulse Oximeter" />
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                    <span className="fw-bold fs-4">Oxygen Saturation (SpO<sub>2</sub>):</span>
                                </div>
                                <div className="p-2 bd-highlight">
                                    <p className="fw-light fs-4">{ oxygenSaturation }<span className="fw-lighter">bpm</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Last Update: { lastUpdated } seconds ago</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {/* <div className="card h-100">
                        <div className="text-center">
                            <img src="images/led.jpg"style={{width : "150px", height : "150px"}} className="card-img-top img-fluid" alt="Atmospheric Temperature" />
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                    <span className="fw-bold fs-4">Control LED:</span>
                                </div>
                                <div className="p-2 bd-highlight">
                                    <form className="fs-4">
                                        <div className="form-check form-switch form-check-inline">
                                            <input className="form-check-input checkbox" type="checkbox" role="switch" id="led1" />
                                            <label className="form-check-label fw-bold pb-2">LED 1</label>
                                        </div>
                                    </form>
                                    <form className="fs-4" action="update_values.php" method="post">
                                        <div className="form-check form-switch form-check-inline">
                                            <input className="form-check-input checkbox" type="checkbox" role="switch" id="led2" />
                                            <label className="form-check-label fw-bold">LED 2</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="text-center">
                                <span className="text-muted fw-bold">LED 1 Toggled</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Home
