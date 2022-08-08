import React, {useState, useEffect} from "react";
import apiService from "../services/api.service";
import RoomPost from "../components/RoomPost";

function Home() {
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [roomPosts, setRoomPosts] = useState([])

  useEffect( ()=>{
    async function fetchData(){
      try{
        const rooms = await apiService.getRooms()
        setRoomPosts(rooms)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

    fetchData()
    
  }, [refresh])

  const deleteRoom = async (id) => {
    try{
      await apiService.deleteRoom(id)
      setRefresh(!refresh)
    }catch(err){
      console.log(err)
    }
  }


  if(loading){
    return <p>Loading...</p>
  }

  return (
      <div className="container mt-20 d-flex justify-content-center">
        <div className="row">
          {
            roomPosts && roomPosts.map(post => {
             return  (<RoomPost 
                post={post}
                key={post._id}
                deleteRoom={deleteRoom}
               />)
            })

          }
        </div>
      </div>
  );
}

export default Home;
