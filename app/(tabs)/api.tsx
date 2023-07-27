import { useState, useEffect } from 'react';


    export function FetchExample() {
        const [data , setData] = useState([]);
        
        useEffect(() => {
            fetchData();
            // Fetch data every 5 minutes (300,000 milliseconds)
            const interval = setInterval(fetchData, 300000);
            // Cleanup the interval when the component is unmounted
            return () => clearInterval(interval);
        }, []);

        const fetchData = async () => {
            try {
            const response = await fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-39B2AC9D-9C96-4196-868C-9EA1062BF9D2&elementName=,TIME,ELEV,WDIR,WDSD,TEMP,HUMD,PRES,24R,H_FX,H_XD,H_FXT,H_F10,H_10D,H_F10T,H_UVI,D_TX,D_TXT,D_TN,D_TNT,D_TS,VIS,Weather&parameterName=CITY'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                // Extract the relevant data from jsonData and set it to the data state
                setData(jsonData.records?.location || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        return data;
    }

//export default FetchExample; 


