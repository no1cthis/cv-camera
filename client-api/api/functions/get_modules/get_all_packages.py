try:
    import xmlrpclib
except ImportError:
    import xmlrpc.client as xmlrpclib

def search_packages_by_pattern(pattern):
    try:
        client = xmlrpclib.ServerProxy('https://pypi.python.org/pypi/')
        all_packages = client.list_packages()
        matching_packages = [pkg for pkg in all_packages if pkg.startswith(pattern)]
        return matching_packages
    except Exception as e:
        print("Error occurred:", e)
        return []