import { Link } from "react-router-dom";
import "./css/OrderSteps.css";

function OrderSteps() {
    return (
        <section className="order_steps">
            <div className="order_steps_left">
                <h2 className="steps_title">
                    Сдача и приёмка <em>авто за 5 минут<br />в 4 шага</em>
                </h2>
                <Link to="/fleet" className="button">Выбрать автомобиль</Link>
            </div>

            <div className="steps">
                <div className="step">
                    <img src="/img/icons/pasport_icon.svg" alt="Документы" />
                    <p>Оставьте заявку и<br />отправьте документы<br />(паспорт и водительское).</p>
                </div>
                <div className="step">
                    <img src="/img/icons/keycaricn.svg" alt="Ключ и авто" />
                    <p>Подготовим для Вас договор аренды,<br />автомобиль и отправим фотографию.<br />
                        Если требуется доставка авто, то<br />доставим в нужное время и место.
                    </p>
                </div>
                <div className="step">
                    <img src="/img/icons/doc_icon.svg" alt="Осмотр" />
                    <p>Сделаем опись авто<br />и фото контроль.</p>
                </div>
                <div className="step">
                    <img src="/img/icons/smile_con.svg" alt="Подпись" />
                    <p>Подпишем договор и акт приема передачи<br />авто и пожелаем счастливого пути.</p>
                </div>
            </div>
        </section>
    );
}

export default OrderSteps;
