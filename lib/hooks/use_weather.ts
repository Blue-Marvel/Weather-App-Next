import { useEffect, useState } from "react"

const useWeather = (city: string, shouldFetch: boolean): {data: any, isLoading: boolean,error: any} => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;
    useEffect(() => {
        if(!city || !shouldFetch) return;
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setData(jsonData);
            } catch(e: any) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city, shouldFetch, url]);

    return {data, isLoading, error};
}

export {useWeather};