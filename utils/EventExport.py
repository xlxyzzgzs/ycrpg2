import os
import json
import re
data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
map_info_path = os.path.join(data_dir, 'MapInfos.json')

event_ext_id_start = 100000

label_pattern = re.compile("<SF_EXTRA_EVENT:\s*(\d*)>", re.IGNORECASE)


def extra_map_event(map_id: int):
    """
    Extra map event data from map_id
    :param map_id: map id

    """
    map_path = os.path.join(data_dir, f'Map{map_id:03}.json')
    map_ext_path = os.path.join(data_dir, f'Map{map_id:03}Ext.json')
    with open(map_path, 'r', encoding='utf-8') as f:
        map_data = json.load(f)

    map_events = map_data['events']
    map_ext_event_list = []
    map_event_list = []
    for event in map_events:
        if event is not None:
            note: str = event['note']
            m = label_pattern.search(note)
            if m is not None:
                event["ext_id"] = int(m.group(1)) + event_ext_id_start
                map_ext_event_list.append(event)
                map_event_list.append(None)
            else:
                map_event_list.append(event)
        else:
            map_event_list.append(None)

    map_data['events'] = map_event_list
    with open(map_path, 'w', encoding='utf-8') as f:
        json.dump(map_data, f, ensure_ascii=False)

    old_ext_data = None
    map_ext_data = None

    if os.path.exists(map_ext_path):
        with open(map_ext_path, 'r', encoding='utf-8') as f:
            map_ext_data = json.load(f)
        old_ext_data = map_ext_data['events']
    else:
        old_ext_data = {}
        map_ext_data = {'events': old_ext_data}

    for event in map_ext_event_list:
        event['id'] = event['ext_id']
        old_ext_data[event['id']] = event
    map_ext_data['events'] = old_ext_data
    with open(map_ext_path, 'w', encoding='utf-8') as f:
        json.dump(map_ext_data, f, ensure_ascii=False)


map_info_f = open(map_info_path, "r")
map_info_json = json.load(map_info_f)
map_info_f.close()

for info in map_info_json:
    if info is not None:
        extra_map_event(info['id'])
