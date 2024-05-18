import {} from "path";
import {loadPackageDefinition, credentials} from "@grpc/grpc-js"
import {loadSync} from "@grpc/proto-loader"
import {ProtoGrpcType} from "../protobuf/camera-service"
import {CameraServiceClient} from "../protobuf/CameraService"

const PORT = 50051

const clients = new Map<string, CameraServiceClient>()

const protofile = "../protobuf/camera-service.proto"
const packageDefinition = loadSync(protofile)
const grpcObject = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType

const deadline = new Date().getTime() + 1000

const client = new grpcObject.cameraService.CameraService(`localhost:${PORT}`, credentials.createInsecure())

client.waitForReady(deadline, (err) => {
    if(err) console.error(err)
    else console.log("Client is ready")
})


export function getClient(ip:string){
    const response = clients.get(ip)
    if(response) return response

    const client = new grpcObject.cameraService.CameraService(`${ip}:${PORT}`, credentials.createInsecure())

    clients.set(ip, client)

    return client
}