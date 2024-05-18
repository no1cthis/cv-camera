import requests

def package_info(package_name):
    response = requests.get(f"https://pypi.org/pypi/{package_name}/json")
    if response.status_code == 200:
        return response.json()
    else:
        return None

package_name = 'requests'  # Replace 'requests' with the package you want to get info about
info = package_info(package_name)
print(info["info"]["description"])
