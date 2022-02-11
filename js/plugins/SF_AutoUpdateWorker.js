onmessage = function (e) {
    var request = e.data;

    switch (request.command) {
        case 'compare':
            compare_file_info(request.local_file_info, request.remote_file_info);
            send_command('finish', []);
            break;
        case 'finish':
            send_command('finish');
            break;
        case 'delete':

    }
}

function compare_file_info(local_file_info, remote_file_info) {
    if (!remote_file_info || local_file_info.is_dir !== remote_file_info.is_dir) {
        send_command('delete', generate_file_list(local_file_info));
        send_command('update', generate_file_list(remote_file_info));
    } else if (local_file_info.sha_512 !== remote_file_info.sha_512) {
        if (local_file_info.is_dir) {
            var visited_children = new Set();
            for (var i in local_file_info.children) {
                compare_file_info(local_file_info.children[i], remote_file_info.children[i]);
                visited_children.add(i);
            }
            for (var i in remote_file_info.children) {
                if (!visited_children.has(i)) {
                    send_command('update', generate_file_list(remote_file_info.children[i]));
                }
            }
        } else {
            send_command('update', generate_file_list(remote_file_info));
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
    file_list.push(file_info.file_name);
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

function delete_file(file_name) {

}