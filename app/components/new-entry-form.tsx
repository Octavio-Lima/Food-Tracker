import IngredientForm from "./ingredient-form";
import Input from "./input";

function NewEntryForm() {
    return (
        <form className="form w" id="form-food">
            <Input id="title">Title</Input>
            <Input id="date" type="date">
                Date
            </Input>
            <Input id="time" type="time">
                Time
            </Input>

            <IngredientForm />
        </form>
    );
}

export default NewEntryForm;
