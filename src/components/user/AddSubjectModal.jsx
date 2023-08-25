import { useEffect } from "react";
import './AddSubjectModal.scss';
import { useDispatch, useSelector } from "react-redux";
import { setSubjects } from "../../feature/subjectSlice";
import { setAddSubjectModalOpen } from "../../feature/modalOpen";
import { useState } from "react";
import { api } from "../../network/api";

const AddSubjectModal = () => {
    const dispatch = useDispatch();
    const mySubjects = useSelector(state => state.subjects.subjects);
    const openAddSubjectModal = useSelector(state => state.openModal.addSubjectModal_isOpen);
    const [addSubjectName, setAddSubjectName] = useState("")
    const uid = useSelector(state => state.me.id)
    //주제 가져오기
    const getSubjects =
        async () => {
            try {
                const subjects = await api(`/api/v1/subjects/with-member/${uid}`, 'GET')
                console.log(subjects.data)
                dispatch(setSubjects(subjects.data));
            } catch (error) {
                console.log(error);
            }
        }

    useEffect(() => {
        getSubjects();

    }, [openAddSubjectModal == true])

    //close button callback
    const closeModal = () => {
        dispatch(setAddSubjectModalOpen(!openAddSubjectModal));
    };

    const onChangeInput = (e) => {
        setAddSubjectName(e.target.value);
    }

    const onClickAddSubjectButtonHandler = async (e) => {
        if (addSubjectName !== "") {
            try {
                console.log(addSubjectName);
                const date = {
                    name: addSubjectName
                }
                await api(`/api/v1/subjects`, 'POST', date)
                getSubjects();
            } catch (error) {
                console.log(error);
                console.log(addSubjectName)
            }
        }
    }

    return <div>
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5000,
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column', // 요소들을 세로로 배치
                    alignItems: 'center',
                }}
            >
                <button onClick={closeModal}>X</button>
                <p>나의 주제</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        {mySubjects.map(subject => (
                            <tr key={subject.id}>
                                <td style={{
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    backgroundColor: '#f5f5f5',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                }}>{subject.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input
                    type="text"
                    placeholder="subject name"
                    onChange={onChangeInput}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        marginTop: '10px',
                        borderRadius: '4px',
                    }}
                />
                <button
                    onClick={onClickAddSubjectButtonHandler}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    추가
                </button>
            </div>
        </div>
    </div>
}
export default AddSubjectModal
