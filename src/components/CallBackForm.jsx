import { useState } from "react";
import { supabase } from "../supabase";
import "./css/CallBackForm.css";

function CallBackForm() {
    const [form, setForm] = useState({ name: "", city: "", phone: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            let cleaned = value.replace(/[^\d+]/g, "");

            if (cleaned.startsWith("+7")) {
                cleaned = cleaned.slice(0, 12);
            } else if (cleaned.startsWith("8")) {
                cleaned = "+7" + cleaned.slice(1, 11);
            } else if (cleaned.startsWith("9")) {
                cleaned = "+7" + cleaned.slice(0, 10);
            } else if (cleaned.startsWith("7")) {
                cleaned = "+" + cleaned.slice(0, 11);
            } else {
                cleaned = cleaned.slice(0, 12);
            }

            setForm((prev) => ({ ...prev, phone: cleaned }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("leads").insert([form]);
        setLoading(false);

        if (error) {
            alert("Ошибка отправки: " + error.message);
        } else {
            setSent(true);
            setForm({ name: "", city: "", phone: "" });
        }
    };

    return (
        <section className="call_back">
            <div className="call_back-content">
                <h2 className="call_back-title">Не нашли<br />что искали?</h2>
                <p className="call_back-text">
                    Оставьте свой контакт, менеджер перезвонит Вам и уточнит все Ваши пожелания или предложит альтернативный вариант.
                </p>

                {sent ? (
                    <p className="success-message">Спасибо! Мы скоро свяжемся с вами.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="call_back-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Ваше имя"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="Город"
                            value={form.city}
                            onChange={handleChange}
                        />
                        <div className="phone-input-wrapper">
                            <select className="country-select" disabled>
                                <option value="ru">RU</option>
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+7 (999) 999-99-99"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="button" disabled={loading}>
                            {loading ? "Отправка..." : "Отправить"}
                        </button>
                    </form>
                )}

                <p className="privacy-policy">
                    Нажимая кнопку отправить Вы соглашаетесь с <a href="#">политикой конфиденциальности</a>
                </p>
            </div>
        </section>
    );
}

export default CallBackForm;
