import style from './Ticket.module.scss'
import { addMinutes } from 'date-fns';

export function Ticket({ ticket }) {

    function getdata(duration) {
        let durationInMinutes = duration / 60;
        let roundedValue = durationInMinutes.toFixed(2);
        let formattedDuration = roundedValue.replace('.', 'Ч ') + 'М';
        return formattedDuration;
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function calculateEndTime(date, duration) {
        const startDate = new Date(date);
        const endDate = addMinutes(startDate, duration);
        return formatTime(endDate.toISOString());
    }

    return (
        <div className={style.ticket}>
            <div className={style.top}>
                <h1>{ticket.price} Р</h1>
                <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} />
            </div>
            <div className={style.bottom}>
                <div className={style.out}>
                    <div className={style.out__container}>
                        <div className={style.out__container__title}>{ticket.segments[0].origin} – {ticket.segments[0].destination}</div>
                        <div className={style.out__container__info}>{formatTime(ticket.segments[0].date)} – {calculateEndTime(ticket.segments[0].date, ticket.segments[0].duration)}</div>
                    </div>
                    <div className={style.out__container}>
                        <div className={style.out__container__title}>В пути</div>
                        <div className={style.out__container__info}>{getdata(ticket.segments[0].duration)}</div>
                    </div>
                    <div className={style.out__container}>
                        <div className={style.out__container__title}>{ticket.segments[0].stops.length === 0 ? 'без пересадок' : `${ticket.segments[0].stops.length} пересадки`}</div>
                        <div className={style.out__container__info}>{ticket.segments[0].stops.map((stop, index) => (<span key={index}>{stop}{index < ticket.segments[0].stops.length - 1 ? ', ' : ''}</span>))}</div>
                    </div>
                </div>
                <div className={style.in}>
                    <div className={style.in__container}>
                        <div className={style.in__container__title}>{ticket.segments[1].origin} – {ticket.segments[1].destination}</div>
                        <div className={style.in__container__info}>{formatTime(ticket.segments[1].date)} – {calculateEndTime(ticket.segments[1].date, ticket.segments[1].duration)}</div>
                    </div>
                    <div className={style.in__container}>
                        <div className={style.in__container__title}>В пути</div>
                        <div className={style.in__container__info}>{getdata(ticket.segments[1].duration)}</div>
                    </div>
                    <div className={style.in__container}>
                        <div className={style.in__container__title}>{ticket.segments[1].stops.length === 0 ? 'без пересадок' : `${ticket.segments[1].stops.length} пересадки`}</div>
                        <div className={style.in__container__info}>{ticket.segments[1].stops.map((stop, index) => (<span key={index}>{stop}{index < ticket.segments[1].stops.length - 1 ? ', ' : ''}</span>))}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}