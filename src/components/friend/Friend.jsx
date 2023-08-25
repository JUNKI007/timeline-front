import { useEffect, useState } from "react";
import { api } from "../../network/api";
import { ToastContainer, toast } from "react-toastify";

const Myfriend = () => {

    const id = 5

    const [members, setMembers] = useState([])


    useEffect(() => {
        getAll()

    }, [])

    const getAll = async () => {
        try {

            const { data } = await api(`api/v1/friends/me`, 'GET')


            console.log(data)

            const mem = data.map((data) => { return { ...data.from, status: data.status } })

            console.log(mem)

            setMembers(mem)


            // setItem(how)
        }
        catch (err) {
            alert('아직 친구가 없어요')
        }
    }

    const accept = async (id) => {
        try {
            await api(`api/v1/friends/to/${id}`, 'PATCH')

            toast.success('친구 수락 완료.', {
                autoClose: 1000
            });

            const data = members.map((member) => member.id === id ? { ...member, status: "FRIEND" } : member)
            setMembers(data)
        }
        catch (err) {
            alert('에러')
        }
    }

    const refuse = async (id) => {
        try {
            await api(`api/v1/friends/to/${id}`, 'DELETE')

            toast.error('친구 삭제 완료.', {
                autoClose: 1000
            });

            const data = members.filter((member) => !(member.id === id))
            setMembers(data)
        }
        catch (err) {
            alert('에러')
        }
    }





    return <>
        <ToastContainer position="bottom-center" />
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '300px', margin: '0 auto' }}>
            친구 및 친구 신청 목록
        </div>
        <div className="flex flex-wrap justify-center">

            {members.map(member => (
                <div className="w-1/3 m-2 p-2 bg-white rounded-md shadow-md" key={member.id}>
                    {member.profilePath ? <img src={`http://192.168.0.226:4000/${member.profilePath}`} alt={member.nickName} className="w-32 h-32 rounded-full mx-auto" /> :
                        <img src={`http://192.168.0.226:4000/profiles\\1692848794647.png`} alt={member.nickName} className="w-32 h-32 rounded-full mx-auto" />}
                    <div className="mt-2">
                        <p className="text-center">{member.nickName}</p>
                    </div>
                    {member.status === 'FRIEND' && <>
                        <div>친구입니다</div>
                        <button onClick={() => refuse(member.id)} style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>친구 삭제</button></>}
                    {member.status !== 'FRIEND' &&
                        <><div>받은 요청</div>
                            <button onClick={() => accept(member.id)} style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>친구 수락</button></>}
                </div>
            ))}
        </div>
    </>

}

export default Myfriend;