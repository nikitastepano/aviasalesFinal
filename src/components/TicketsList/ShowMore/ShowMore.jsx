import style from './ShowMore.module.scss'
import { useDispatch } from 'react-redux'
import { increaseValue } from '../../../redux/ticketsSlice'

export function ShowMore() {
    const dispatch = useDispatch()
    return (
        <>
        <button className={style.showmore} onClick={() => dispatch(increaseValue())}>Показать еще 5 билетов!</button>
        </>
    )
}