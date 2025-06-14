import { useState } from "react";
import { supabase } from "../supabase";
import "./css/LeadForm.css";

function LeadForm() {
    const [form, setForm] = useState({ name: "", city: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

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
            // остальные поля (name, city и т.д.)
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("leads").insert([form]);

        setLoading(false);
        if (error) {
            alert("Ошибка: " + error.message);
        } else {
            setSent(true);
            setForm({ name: "", city: "", phone: "" });
        }
    };

    return (
        <section className="lead-section">
            <div className="lead-content">
                <div className="lead-text">
                    <h2>
                        У Вас будет <span className="accent">персональный менеджер</span>
                    </h2>
                    <p>
                        Менеджер обеспечит Вам удобство и комфорт в выборе автомобиля, учитывая Ваши потребности и бюджет. А также сопроводит Вас на всех этапах предоставления услуги.
                    </p>

                    {sent ? (
                        <p className="success-message">Спасибо! Мы скоро свяжемся с вами.</p>
                    ) : (
                        <form className="lead-form" onSubmit={handleSubmit}>
                            <input
                                name="name"
                                placeholder="Ваше имя"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="city"
                                placeholder="Город"
                                value={form.city}
                                onChange={handleChange}
                            />
                            <input
                                name="phone"
                                placeholder="+7 (___) ___-__-__"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="button" disabled={loading}>
                                {loading ? "Отправка..." : "Отправить"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default LeadForm;