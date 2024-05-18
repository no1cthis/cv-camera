export async function getModules(){
    const response = await fetch('http://localhost:5000/modules')

    return response.json()
}