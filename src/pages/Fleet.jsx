import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "../components/css/Fleet.css";
import CallBackForm from "../components/CallBackForm.jsx";
import "../components/css/CallBackForm.css";


function Fleet() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const { data, error } = await supabase
                .from("cars")
                .select("*")
                .order("created_at", { ascending: false });

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
                <span className="accent">Все</span> автомобили
            </h2>

            <div className="popular__list">
                {cars.map((car) => (
                    <div className="popular__card" key={car.id}>
                        {car.images?.[0] && (
                            <img
                                src={car.images[0]}
                                alt={car.name}
                                className="popular__image"
                            />
                        )}
                        <div className="popular__info">
                            <h3>{car.name}</h3>
                            <p className="popular__power">{car.power} л.с </p>
                            <div className="popular__price">
                                от {car.price_per_day.toLocaleString()} руб/сутки
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <CallBackForm />
        </section>

    );
}

export default Fleet;
