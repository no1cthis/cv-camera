from twirp.context import Context
from proto_services.camera_service_pb2 import InstallModulesRequest
from proto_services.camera_service_twirp import CameraServiceClient


def install_modules_function(address:str, modules: list):
    try:
        return CameraServiceClient("http://"+address).InstallModules(ctx=Context(), request=InstallModulesRequest(modules=modules))
    except Exception as e:
        return False
