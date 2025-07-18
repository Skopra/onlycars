import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import "./css/PopularCars.css";

function PopularCars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const { data, error } = await supabase
                .from("cars")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(4);

            if (error) {
                console.error("Ошибка загрузки:", error);
            } else {
                setCars(data);
            }
        };

        fetchCars();
    }, []);

    return (
        <section className="popular">
            <h2 className="popular__title">
                <span className="accent">Популярные</span> автомобили
            </h2>

            <div className="popular__list">
                {cars.map((car) => (
                    <Link to={`/car/${car.id}`} key={car.id} className="popular__card">
                        {car.images?.[0] && (
                            <img src={car.images[0]} alt={car.name} className="popular__image" />
                        )}
                        <div className="popular__info">
                            <h3>{car.name}</h3>
                            <p className="popular__power">{car.power} л.с</p>
                            <span className="popular__price">
                                от {car.price_per_day.toLocaleString()} руб/сутки →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <Link to="/fleet" className="button">
                Смотреть весь автопарк
            </Link>
        </section>
    );
}

export default PopularCars;
