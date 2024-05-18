import grpc
from proto_services.camera_service_pb2_grpc import CameraServiceStub, camera__service__pb2


def install_modules_function(address:str, modules: list):
    try:
        with grpc.insecure_channel(address) as channel:
            stub = CameraServiceStub(channel)
            return stub.InstallModules(camera__service__pb2.InstallModulesRequest(modules=modules))
    except Exception as e:
        return False
