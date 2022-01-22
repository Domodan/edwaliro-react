import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const locale = 'EN';
        let dateNow = new Date();

        let day = dateNow.toLocaleDateString(locale, { weekday: 'long' });
        setDay(day);
        let date = dateNow.toLocaleDateString(locale, { day: 'numeric' });
        setDate(date);
        let month = dateNow.toLocaleDateString(locale, { month: 'long' });
        setMonth(month)
        let year = dateNow.getFullYear();
        setYear(year);
        let time = dateNow.toLocaleTimeString(locale, { hour: '2-digit', hour12: true, minute: 'numeric', second: 'numeric'});
        setTime(time);

        // console.log("Time Now: ", time);

        const timer = setInterval(() => {
            dateNow = new Date();

            day = dateNow.toLocaleDateString(locale, { weekday: 'long' });
            setDay(day);
            date = dateNow.toLocaleDateString(locale, { day: 'numeric' });
            setDate(date);
            month = dateNow.toLocaleDateString(locale, { month: 'long' });
            setMonth(month);
            year = dateNow.getFullYear();
            setYear(year);
            time = dateNow.toLocaleTimeString(locale, { hour: '2-digit', hour12: true, minute: 'numeric', second: 'numeric'});
            setTime(time);

        }, 10 * 100);

        return () => {
            clearInterval(timer);
        }
        
    }, []);

    return (
        <div>
            <p className="blog-post-meta text-muted">
                As at: { time } | { day }, { ((date === 1) || (date === 21) || (date === 31))? date+"st":date+"th" } { month } { year }
            </p>
        </div>
    )
}

export default Timer
