import Form from "./Form"

const Modal = ({ updateCallback, currentUser }) => {
  return (
    <div className="modal fade" id="formModal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="formModalLabel">{currentUser.id ? 'Update User' : 'Create User'}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <Form updateCallback={updateCallback} currentUser={currentUser} />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" form="CreateForm" data-bs-dismiss="modal">Submit</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Modal