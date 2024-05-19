from twirp.context import Context
from proto_services.camera_service_twirp import CameraServiceClient
from google.protobuf import empty_pb2


def is_camera_alive(ip:str, port:str):
    address = ip + ":" + port
    print("Checking if camera is alive at " + address + "...")
    try:
        response = CameraServiceClient("http://"+address).IsCameraAlive(ctx=Context(), request=empty_pb2.Empty())
        print("Camera is alive!")
        return response
    except Exception as e:
        print(e)
        return False
