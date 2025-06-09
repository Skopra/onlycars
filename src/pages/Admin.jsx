import AddCarForm from "../components/AddCarForm";
import CarListAdmin from "../components/CarListAdmin";

function Admin() {
    return (
        <div style={{ padding: "30px", margin: "50px 0 0 0" }}>
            <h1>Панель администратора</h1>
            <AddCarForm />
            <hr />
            <CarListAdmin />
        </div>
    );
}

export default Admin;
