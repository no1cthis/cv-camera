import grpc
from proto_services.camera_service_pb2_grpc import CameraServiceStub
from google.protobuf import empty_pb2


def is_camera_alive(ip:str, port:str):
    address = ip + ":" + port
    print("Checking if camera is alive at " + address + "...")
    try:
        with grpc.insecure_channel(address) as channel:
            stub = CameraServiceStub(channel)
            return stub.IsCameraAlive(empty_pb2.Empty())
    except Exception as e:
        return False
