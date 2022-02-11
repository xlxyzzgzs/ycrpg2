onmessage = function (e) {
    var request = e.data;

    var delete_list = [];
    var update_list = [];

    switch (request.command) {
        case 'compare':
            compare_file_info(request.local_file_info, request.remote_file_info, delete_list, update_list);
            send_command('delete', delete_list);
            send_command('update', update_list);
            send_command('finish', []);
            break;
        case 'finish':
            send_command('finish');
            break;
    }
}

function compare_file_info(local_file_info, remote_file_info, delete_list, update_list) {
    if (!remote_file_info) {
        delete_list = delete_list.concat(generate_file_list(local_file_info));
    } else if (!local_file_info) {
        update_list = update_list.concat(generate_file_list(remote_file_info));
    } else if (local_file_info.is_dir !== remote_file_info.is_dir) {
        delete_list = delete_list.concat(generate_file_list(local_file_info));
        update_list = update_list.concat(generate_file_list(remote_file_info));
    } else if (local_file_info.sha_512 !== remote_file_info.sha_512) {
        if (local_file_info.is_dir) {
            var visited_children = new Set();
            for (var i in local_file_info.children) {
                compare_file_info(local_file_info.children[i], remote_file_info.children[i], delete_list, update_list);
                visited_children.add(i);
            }
            for (var i in remote_file_info.children) {
                if (!visited_children.has(i)) {
                    update_list = update_list.concat(generate_file_list(remote_file_info.children[i]));
                }
            }
        } else {
            update_list = update_list.concat(generate_file_list(remote_file_info));
        }
    }
}


function generate_file_list(file_info) {
    if (!file_info) { return []; }

    var file_list = [];
    if (file_info.is_dir) {
        for (var i in file_info.children) {
            file_list = file_list.concat(generate_file_list(file_info.children[i]));
        }
    }
    file_list.push({
        "file_name": file_info.file_name,
        "is_dir": file_info.is_dir,
        "is_file": file_info.is_file,
        "sha_512": file_info.sha_512
    });
    return file_list;
}

// command: delete, update, finish
function send_command(command, file_list) {
    var command_data = {
        command: command,
        file_list: file_list
    };
    postMessage(command_data);
}