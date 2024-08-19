import style from './Filter.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../../redux/filterSlice'

export function Filter() {
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)

    return (
        <div className={style.filter}>
            <h1>Количество пересадок</h1>
            <label><input type="checkbox" onChange={() => dispatch(setFilter('all'))} value={filter.all} checked={filter.all} /> Все</label>
            <label><input type="checkbox" onChange={() => dispatch(setFilter('withoutTransfers'))} value={filter.withoutTransfers} checked={filter.withoutTransfers} /> Без пересадок</label>
            <label><input type="checkbox" onChange={() => dispatch(setFilter('oneTransfers'))} value={filter.oneTransfers} checked={filter.oneTransfers} /> 1 пересадка</label>
            <label><input type="checkbox" onChange={() => dispatch(setFilter('twoTransfers'))} value={filter.twoTransfers} checked={filter.twoTransfers} /> 2 пересадки</label>
            <label><input type="checkbox" onChange={() => dispatch(setFilter('threeTransfers'))} value={filter.threeTransfers} checked={filter.threeTransfers} /> 3 пересадки</label>
        </div>
    )
}