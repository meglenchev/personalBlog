import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext.jsx";
import { useEffect } from "react";

export function UserLogout() {
    const { onLogout } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        onLogout()
            .then(() => {
                navigate('/pb-admin/login');
            })
            .catch((err) => {
                console.error("Logout error:", err);
                setShowModal(true);
            })

    }, [onLogout, navigate]);

    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    };

    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Грешка</h2>
                <p>Заявката за излизане не бе успешна!</p>
                <button onClick={closeModal} className="btn btn-edit">ОК</button>
            </div>
        </div>
    )
}
