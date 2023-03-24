import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const RootHome = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RootHome
