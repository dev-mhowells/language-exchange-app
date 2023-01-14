import { useLogout } from "../hooks/useLogout"

export default function Nav() {

    const {logout} = useLogout()

    const handleCLick = () => {
        logout()
    }

    return (
        <div className="nav">
            <button className="logout-btn" onClick={handleCLick}>log out</button>
        </div>
    )
}