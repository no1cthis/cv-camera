import {TwirpFetchTransport} from "@protobuf-ts/twirp-transport"
import {CameraServiceClient} from "../protobuf/camera_service.client"


const clients = new Map<string, CameraServiceClient>()
const PORT = 50051


export function getClient(ip:string){
    const url = `http://${ip}:${PORT}/twirp`
    const response = clients.get(url)
    if(response) return response

    const transport = new TwirpFetchTransport({baseUrl: url })
    const client = new CameraServiceClient(transport)
    

    clients.set(ip, client)

    return client
}