import { useEffect, useState } from "react";
import { api } from "../../network/api";

const Myfriend = () => {

    const id = 5

    const [members, setMembers] = useState([])


    useEffect(() => {
        getAll()

    }, [])

    const getAll = async () => {
        try {

            const { data } = await api(`api/v1/friends`, 'GET')


            console.log(data)

            const mem = data.map((data) => data.to)

            console.log(mem)

            setMembers(mem)


            // setItem(how)
        }
        catch (err) {
            alert('err')
        }
    }





    return <div className="flex flex-wrap justify-center">
        {members.map(member => (
            <div className="w-1/4 m-2 p-2 bg-white rounded-md shadow-md" key={member.id}>
                <img src={`http://192.168.0.226:4000/${member.profilePath}`} alt={member.nickName} className="w-32 h-32 rounded-full mx-auto" />
                <div className="mt-2">
                    <p className="text-center">{member.nickName}</p>
                </div>
                {/* <button className="mt-2 w-full bg-red-500 text-white p-2 rounded-md" onClick={() => handleDeleteMember(member.id)}>
      친구 삭제
    </button> */}
            </div>
        ))}
    </div>

}

export default Myfriend;