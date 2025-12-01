export function LoginModal({
    onClose
}) {
    return (
        <>
            <div className="login-modal" onClick={onClose}></div>
            <div className="login-container">
                <form>
                    <div className="form-group">
                        <input type="text" id="useremail" name="email" placeholder="Имейл" required />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder="Парола" required />
                    </div>
                    <button type="submit" className="btn btn-login">Влез</button>
                </form>
            </div>
        </>
    )
}