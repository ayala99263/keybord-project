import './addFile.css';

function AddFile({phoneNumber,add_file}) {
    console.log(phoneNumber);
    const data_of_current_user = JSON.parse(localStorage.getItem(phoneNumber));
    console.log(data_of_current_user);
    const files_af_current_user = data_of_current_user?.filesArray || [];

    return (
        <div className="add-file-container">
            <h3 className="add-file-title">📁 קבצים שמורים</h3>
            <div className="files-list">
                {
                    files_af_current_user.length === 0 
                        ? <div className="no-files">📄 אין קבצים שמורים</div>
                        : files_af_current_user.map((file, index) => (
                            <button 
                                key={index} 
                                className="file-item"
                                onClick={() => add_file(file.name,file.data)}
                            >
                                📄 {file.name}
                            </button>
                        ))
                }
            </div>
        </div>
    )
}
export default AddFile;

