cache = {}
def maybe_cached(key, get_value_function):
    if key in cache:
        print("from cache " + key)
        return cache[key]
    else:
        value = get_value_function()
        addToCache(key, value)
        return value

def addToCache(key, value):
    cache[key] = value