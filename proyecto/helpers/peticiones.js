export const getData = async (perros)=>{
    const {data} = await axios.get(perros)
    return data
}
