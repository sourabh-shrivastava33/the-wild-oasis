import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
	// const [showForm, setShowForm] = useState(false);

	return (
		<div>
			<Modal>
				<Modal.Open opens="cabins-form">
					<Button>Add Cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabins-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCabin;
