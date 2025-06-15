import { Link } from "react-router-dom";
import "./css/Reputation.css";

function Reputation() {
    return (
        <section className="reputation">
            <div className="reputation__top">
                <h2 className="reputation__title">
                    <em>8 лет безупречной репутации</em>
                    <br />
                    на рынке автопроката
                </h2>
                <img
                    src="/img/banner/reputation_bg.svg"
                    alt="Фон — репутация"
                    className="reputation__bg"
                />
            </div>

            <div className="reputation__bottom">
                <ul className="reputation__list">
                    <li className="reputation__item">
                        Предоставляем чистые и полностью заправленные авто
                    </li>
                    <li className="reputation__item">
                        Регулярно проводим тех. обслуживание автомобилей
                    </li>
                    <li className="reputation__item">Не брендируем автомобили</li>
                    <li className="reputation__item">
                        Нет жёстких систем штрафов и скрытых комиссий
                    </li>
                    <li className="reputation__item">
                        Не ведем видео и аудиозапись в автомобиле
                    </li>
                    <li>
                        <Link to="/fleet" className="button">
                            Выбрать автомобиль
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Reputation;
