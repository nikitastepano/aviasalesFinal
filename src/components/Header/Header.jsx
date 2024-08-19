import style from './Header.module.scss'
import img from '../../images/Logo.svg'

// import { memo } from 'react'
// export const Header = memo(() => {
//     return (
//         <div className={style.header}>
//             <img src="/Logo.svg" alt="Logo" />
//         </div>
//     )
// })

export function Header() {
    return (
        <div className={style.header}>
            <img src={img} alt="Logo" />
        </div>
    )
}