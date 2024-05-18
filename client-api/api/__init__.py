from flask import Flask, request
from flask_cors import CORS
from api.functions.get_network_devices.get_network_devices import get_network_devices_function
from api.functions.get_modules.get_modules import get_modules_function
from api.functions.get_modules.get_package_info import get_package_info
from api.functions.get_modules.get_module_description import get_module_description
from api.functions.install_modules.install_modules import install_modules_function
from .constants import PORT

# from scapy.all import ARP, Ether, srp

# Create an instance of the Flask class
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Define a route and a view function
@app.route('/network-devices')
def get_network_devices():
    return get_network_devices_function()

@app.route('/install-modules', methods=['POST'], strict_slashes=False)
def install_modules():
    data = request.json

    for address in data["addresses"]:
        install_modules_function(f"{address}:{PORT}", data["modules"])
    return {"status": "success"}

@app.route('/modules')
def get_modules():
    return get_modules_function()

@app.route('/modules/<string:module>')
def get_module(module):
    info = get_package_info(module)
    return {"name": module, "description": get_module_description(info)}


# Run the application
def start():
    app.run()