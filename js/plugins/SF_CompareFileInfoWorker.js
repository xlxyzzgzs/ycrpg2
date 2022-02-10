onmessage = function (e) {
    var local_file_info = e.data[0];
    var remote_file_info = e.data[1];

    local_file_info.is_dir = local_file_info.is_dir || false;
    remote_file_info.is_dir = remote_file_info.is_dir || false;
}

function compare_file_info(local_file_info, remote_file_info) {
}

function compare_file_file(local_file_info, remote_file_info) {
    console.assert(local_file_info.is_file === remote_file_info.is_file);

}

function generate_delete_file_list(file_info) {
    var delete_file_list = [];
    if (file_info.is_dir) {
        for (var i = 0; i < file_info.children.length; i++) {
            delete_file_list = delete_file_list.concat(generate_delete_file_list(file_info.children[i]));
        }
    }
}