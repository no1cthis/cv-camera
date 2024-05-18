export async function getModule(module:string){
    const response = await fetch(`http://localhost:5000/modules/${module}`)

    return response.json()
}