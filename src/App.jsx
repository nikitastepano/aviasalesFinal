import style from './App.module.scss'
import { Header } from './components/Header/Header'
import { Filter } from './components/Filter/Filter'
import { TicketsList } from './components/TicketsList/TicketsList'

export default function App() {
  return (
    <>
    <div className={style.aviasales}>
      <Header />
      <div className={style.aviasales__main}>
        <Filter />
        <TicketsList />
      </div>
    </div>
    </>
  )
}
