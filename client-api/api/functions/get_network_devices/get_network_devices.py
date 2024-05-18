from api.functions.get_network_devices.scan_network import scan_network
import threading
from api.functions.get_network_devices.is_camera_alive import is_camera_alive

def get_network_devices_function ():
    devices = []
    threads = []
    results_lock = threading.Lock()

    # Define a function to be executed by each thread
    def scan_thread(ip_range):
        local_results = []
        scan_network(ip_range, local_results)
        with results_lock:
            devices.extend(local_results)

    # Create threads to scan different parts of the network
    for i in range(1, 255):
        thread = threading.Thread(target=scan_thread, args=(f"192.168.1.{i}",))
        thread.start()
        threads.append(thread)

    # Wait for all threads to finish
    for thread in threads:
        thread.join()

    filtered_devices = [device for device in devices if is_camera_alive(device['ip'], "50051")]
    return filtered_devices