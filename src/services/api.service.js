import axios from "axios";

class ApiService {

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE,
    });

    this.api.interceptors.request.use((config) => {
      // Verifica se já temos as informações do usuário logado no localStorage
      const storedUser = localStorage.getItem("loggedInUser");
    
      const loggedInUser = JSON.parse(storedUser || '""');
    
      if (loggedInUser.token) {
        config.headers = {
          Authorization: `Bearer ${loggedInUser.token}`,
        };
      }
    
      return config;
    });
  }

  async signUp(user) {
    return await this.api.post("/signup", user);
  }

  async login(user) {
    return await this.api.post("/login", user);
  }

  async getRooms(){
    const response =  await this.api.get('/rooms')
    return response.data
  }

  async deleteRoom(id){
    const response = await this.api.delete(`/rooms/${id}`)
    return response.data
  }

  async createRoom(room){
    const response = await this.api.post('/rooms')
    return response.data
  }

  async getRoom(id){
    const response  = await this.api.get(`/rooms/${id}`)
    return response.data
  }

  async createReview(id, review) {
    const response  = await this.api.post(`/rooms/${id}/reviews`, review)
    return response.data
  }

}

export default new ApiService();
