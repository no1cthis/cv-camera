import subprocess

# Define the command
command = [
    "../protobuf/protoc.exe",
    "-I../protobuf",
    "--python_out=./cv_smart_house_camera/proto_services",
    "--twirpy_out=./cv_smart_house_camera/proto_services",
    "../protobuf/camera_service.proto"
]

def compile_proto_files():
    # Execute the command
    try:
        subprocess.run(command, check=True)
        print("Proto files compiled successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error compiling proto files: {e}")
