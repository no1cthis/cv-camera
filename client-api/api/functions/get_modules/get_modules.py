from api.functions.get_modules.get_all_packages import search_packages_by_pattern
from api.functions.get_modules.get_package_info import get_package_info
from api.utils.maybe_cached import maybe_cached
from api.functions.get_modules.get_module_description import get_module_description

pattern = "cv_smart_house_module_" 

def get_modules_function():
    result = []
    modules = maybe_cached( key="modules_full_list", get_value_function=lambda:search_packages_by_pattern(pattern=pattern))
    filtered_modules = [x for x in modules if x is not None]

    # modules.map(module => ({name: module, description: get_package_info(module)["description"]}))
    for module in filtered_modules:
        info = maybe_cached(key=module, get_value_function=lambda: get_package_info(module))
        
        if info is None:
            continue

        result.append({"name": module, "description": get_module_description(info), "version": info["version"]})

    return result
