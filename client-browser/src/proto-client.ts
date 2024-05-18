import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport"
import {CameraServiceClient} from "../protobuf/camera-service.client"


const clients = new Map<string, CameraServiceClient>()
const PORT = 50051


export function getClient(ip:string){
    const url = `http://${ip}:${PORT}/`
    const response = clients.get(url)
    if(response) return response

    const transport = new GrpcWebFetchTransport({baseUrl: url, format: "binary", timeout: Date.now() + 10000})
    const client = new CameraServiceClient(transport)

    clients.set(ip, client)

    return client
}