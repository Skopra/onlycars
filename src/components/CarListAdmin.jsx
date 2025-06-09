import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function CarListAdmin() {
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        const { data, error } = await supabase.from("cars").select("*");
        if (error) {
            console.error("Ошибка загрузки машин:", error);
        } else {
            setCars(data);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Удалить этот автомобиль?")) return;
        const { error } = await supabase.from("cars").delete().eq("id", id);
        if (error) {
            alert("Ошибка при удалении: " + error.message);
        } else {
            setCars((prev) => prev.filter((car) => car.id !== id));
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto" }}>
            <h2>Все автомобили</h2>
            {cars.length === 0 && <p>Нет данных</p>}
            {cars.map((car) => (
                <div key={car.id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
                    <h3>{car.name}</h3>
                    <p><strong>Цена:</strong> {car.price_per_day} ₽ / сутки</p>
                    <p><strong>Залог:</strong> {car.deposit} ₽</p>
                    <p><strong>Год:</strong> {car.year}</p>
                    {car.images && car.images[0] && (
                        <img src={car.images[0]} alt={car.name} style={{ maxWidth: "200px", display: "block", marginTop: "10px" }} />
                    )}
                    <button onClick={() => handleDelete(car.id)} style={{ marginTop: "10px" }}>Удалить</button>
                </div>
            ))}
        </div>
    );
}

export default CarListAdmin;
