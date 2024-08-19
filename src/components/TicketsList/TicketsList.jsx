import style from './TicketsList.module.scss'
import { ShowMore } from './ShowMore/ShowMore'
import { Ticket } from './Ticket/Ticket'
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from '../../redux/sortSlice'
import { useEffect } from 'react'
import { fetchTickets } from '../../redux/ticketsSlice'
import { Flex, Spin } from 'antd';

export function TicketsList() {
    const dispatch = useDispatch()
    const { sort } = useSelector((state) => state.sort)
    const filter = useSelector((state) => state.filter)
    const { tickets, stop, searchId, value } = useSelector((state) => state.tickets)

    useEffect(() => {
        if (!stop) dispatch(fetchTickets(searchId))
    }, [tickets, stop, searchId])

    const filterTickets = (ticket) => {
            const stops = ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0);
            if (!filter.all && !filter.withoutTransfers && !filter.oneTransfers && !filter.twoTransfers && !filter.threeTransfers) {
                return false
            }
            if (filter.withoutTransfers && stops === 0) {
                return true;
            }
            if (filter.oneTransfers && stops === 1) {
                return true;
            }
            if (filter.twoTransfers && stops === 2) {
                return true;
            }
            if (filter.threeTransfers && stops === 3) {
                return true;
            }
            return false;
    };

    const sortTickets = (tickets) => {
        switch (sort) {
            case 'сheapest':
                return tickets.sort((a, b) => a.price - b.price)
            case 'fastest':
                return tickets.sort((a, b) => {
                    const durationA = a.segments[0].duration + a.segments[1].duration
                    const durationB = b.segments[0].duration + b.segments[1].duration
                    return durationA - durationB
                })
            case 'optimal':
                return tickets.sort((a, b) => {
                    const priceA = a.price
                    const priceB = b.price
                    const durationA = a.segments[0].duration + a.segments[1].duration
                    const durationB = b.segments[0].duration + b.segments[1].duration
                    return (priceA / durationA) - (priceB / durationB)
                })
            default:
                return tickets
        }
    }

    const renderTickets = (tickets) => {
        const inTickets = [];
        for (let i = 0; i < tickets.length && value < tickets.length && inTickets.length < value; i++) {
            const ticket = tickets[i]
            if (filterTickets(ticket)) {
                inTickets.push(ticket)
            }
        }
        sortTickets(inTickets)
        return inTickets
    }

    const renderedTickets = renderTickets(tickets)

    return (
        <div className={style.ticketslist}>
            <div className={style.tabs}>
                <button className={sort === 'сheapest' ? style.active : ''} onClick={() => dispatch(setSort('сheapest'))}>Самый дешевый</button>
                <button className={sort === 'fastest' ? style.active : ''} onClick={() => dispatch(setSort('fastest'))}>Самый быстрый</button>
                <button className={sort === 'optimal' ? style.active : ''} onClick={() => dispatch(setSort('optimal'))}>Оптимальный</button>
            </div>
            {!stop && <div className={style.spin}>
                <Flex align="center" gap="middle"><Spin size="large" />
                <div className={style.spin__text}>Загрузка билетов...</div>
            </Flex></div>}
            {!filter.all && !filter.withoutTransfers && !filter.oneTransfers && !filter.twoTransfers && !filter.threeTransfers && <div className={style.notafilters}>Подходящих рейсов под заданные фильтры, не найдено.</div>}
            {renderedTickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)}
            <ShowMore />
        </div>
    )
}