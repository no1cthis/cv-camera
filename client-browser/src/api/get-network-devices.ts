export async function getNetworkDevices(){
    const response = await fetch('http://localhost:5000/network-devices')

    return response.json()
}