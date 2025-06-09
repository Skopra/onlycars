import { useState } from "react";
import { supabase } from "../supabase";

function AddCarForm() {
    const [form, setForm] = useState({
        name: "",
        price_per_day: "",
        deposit: "",
        year: "",
        power: "",
        engine_volume: "",
        clearance: "",
        transmission: "",
        body_type: "",
        drive: "",
        equipment: "",
        fuel_info: "",
        images: [""],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...form.images];
        newImages[index] = value;
        setForm((prev) => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCar = {
            ...form,
            price_per_day: Number(form.price_per_day),
            deposit: Number(form.deposit),
            year: Number(form.year),
            images: form.images.filter((img) => img.trim() !== ""),
        };

        const { error } = await supabase.from("cars").insert([newCar]);

        if (error) {
            console.error("Ошибка при добавлении:", error);
            alert("Ошибка: " + error.message);
        } else {
            alert("Автомобиль успешно добавлен");
            setForm({
                name: "",
                price_per_day: "",
                deposit: "",
                year: "",
                power: "",
                engine_volume: "",
                clearance: "",
                transmission: "",
                body_type: "",
                drive: "",
                equipment: "",
                fuel_info: "",
                images: [""],
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: "600px",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            <h2>Добавить автомобиль</h2>

            <input name="name" placeholder="Название" value={form.name} onChange={handleChange} required />
            <input name="price_per_day" placeholder="Цена за сутки" type="number" value={form.price_per_day} onChange={handleChange} required />
            <input name="deposit" placeholder="Залог" type="number" value={form.deposit} onChange={handleChange} />
            <input name="year" placeholder="Год выпуска" type="number" value={form.year} onChange={handleChange} />
            <input name="power" placeholder="Мощность" value={form.power} onChange={handleChange} />
            <input name="engine_volume" placeholder="Объём двигателя" value={form.engine_volume} onChange={handleChange} />
            <input name="clearance" placeholder="Клиренс" value={form.clearance} onChange={handleChange} />
            <input name="transmission" placeholder="КПП" value={form.transmission} onChange={handleChange} />
            <input name="body_type" placeholder="Тип кузова" value={form.body_type} onChange={handleChange} />
            <input name="drive" placeholder="Привод" value={form.drive} onChange={handleChange} />
            <textarea name="equipment" placeholder="Комплектация" value={form.equipment} onChange={handleChange} />
            <textarea name="fuel_info" placeholder="Топливо" value={form.fuel_info} onChange={handleChange} />

            <label>Ссылки на фото:</label>
            {form.images.map((url, index) => (
                <input
                    key={index}
                    placeholder={`Фото ${index + 1}`}
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                />
            ))}
            <button type="button" onClick={addImageField}>+ ещё фото</button>

            <button type="submit">Сохранить</button>
        </form>
    );
}

export default AddCarForm;
