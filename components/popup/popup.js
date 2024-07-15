import Button from "../button/button";
import styles from "./popup.module.css";

export default function Popup({title, setDeletePopup, func}) {

    function closePopup() {
        setDeletePopup(false);
    }

    return (
        <div className={styles.back}>
            <div>
                <h1>{title}</h1>
                <div>
                    <Button text="Excluir" type="delete" onClick={func}><p>Excluir</p></Button>
                    <Button text="Voltar" type="normal" onClick={closePopup}><p>Voltar</p></Button>
                </div>
            </div>
        </div>
    )
}