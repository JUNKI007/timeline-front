
import React, { useEffect, useState } from 'react';
import './PostModal.scss';
import { api } from '../../network/api';
import { setSubjects } from '../../feature/subjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setPostinModalOpen } from '../../feature/modalOpen';

const PostModal = () => {

    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [setDate, setSetDate] = useState(new Date);
    const [subjectNum, setSubjectNum] = useState("");
    const dispatch = useDispatch();
    const mySubjects = useSelector(state => state.subjects.subjects);
    const openPostingModal = useSelector(state => state.openModal.postingModal_isOpen);
    const uId = useSelector(state => state.me.id)
    const closeModal = () => {
        dispatch(setPostinModalOpen(!openPostingModal));
    };

    useEffect(() => {
        if (mySubjects.length === 0)
            getSubjects();

        if (mySubjects.length > 0) {
            setSubjectNum(mySubjects[0].id);
        }

    }, [mySubjects, openPostingModal === true])

    const getSubjects =
        async () => {
            try {
                const subjects = await api(`/api/v1/subjects/with-member/${uId}`, 'GET')

                dispatch(setSubjects(subjects.data));
            } catch (error) {
                console.log(error);
            }
        }

    const handleChangeFile = (event) => {
        setImgFile(event.target.files[0]);
        setImgBase64("");

        if (event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            // 파일 상태 업데이트
            reader.onloadend = () => {
                // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                const base64 = reader.result;
                if (base64) {
                    var base64Sub = base64.toString()
                    setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                }
            }
        }
    }

    const onChangeSetDateHandler = (e) => {
        const selectedDate = new Date(e.target.value);
        setSetDate(selectedDate)
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onchangeSubjectNum = (e) => {
        setSubjectNum(e.target.value);
    }

    const writePost = async () => {
        const fd = new FormData();
        fd.append("file", imgFile);
        fd.append("title", title);
        fd.append("content", content);
        fd.append("subjectNum", subjectNum);
        fd.append("setDate", setDate.toDateString());

        console.log(title, content)
        await api('/api/v1/posts', "POST", fd).then((response) => {
            if (response.data) {
                //포스트 올린거 응답오면 닫기
                dispatch(setPostinModalOpen(!openPostingModal));
            }
        }).catch((error) => {
        })
    }

    return (
        <div className="modal-overlay">
            {openPostingModal && (
                <div className="post-modal-wrapper">
                    <div className="post-modal-content">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <input type="text" placeholder="Title" name="title" className="input-field title-field" onChange={onChangeTitle}></input>
                        <div className="input-row">
                            <select className="input-field input-wide" onChange={onchangeSubjectNum}>
                                {mySubjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>
                            <input type="file" onChange={handleChangeFile} className="input-field input-wide"></input>
                        </div>
                        {imgBase64 && <img src={imgBase64} alt="Image" className="centered-image" />}
                        <input type="text" placeholder="Content" name="content" className="input-field" onChange={onChangeContent}></input>
                        <input type="date" className="input-field" onChange={onChangeSetDateHandler}></input>
                        <button onClick={writePost} className="post-button">POST</button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default PostModal;
