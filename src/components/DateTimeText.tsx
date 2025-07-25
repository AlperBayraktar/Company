import { useEffect, useState } from "react";

function DateTimeText() {
    const [date, setDate] = useState(new Date());
    const [wish, setWish] = useState("");
    const [dateString, setDateString] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            let d = new Date()
            setDate(d)
            
            const day = d.toLocaleDateString("tr", { weekday: 'long' });
            const date = `${day}, ${d.getDate()} ${d.toLocaleDateString("tr", { month: 'long' })} ${d.getFullYear()}\n\n`;
            setDateString(date)

            const time = d.toLocaleTimeString()
            setTime(time)

            const hour = d.getHours();
            const wish = `${ (hour < 6 && "İyi geceler, tabii uyuyabilirsen...") || (hour < 12 && 'Günaydın') || (hour < 17 && 'Tünaydın') || 'İyi akşamlar'}`;
            setWish(wish)        
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
    <div className="w-screen text-center ">
      <h1 className="text-8xl mb-4">{time}</h1>
      <h2 className="text-xl">{dateString}</h2>
      <h2 className="text-4xl logo-text italic relative top-32">{wish}</h2>
      
    </div>
  );
}

export default DateTimeText;