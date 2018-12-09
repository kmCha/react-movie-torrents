const os = require("os").platform();

module.exports = {
	"require_path" : os == "linux" ? "/usr/local/lib/node_modules/" : "",
	"sprite_limit" : 8192,
	"include_host" : "http://qnm.163.com",
	"encode" : "utf-8",
    "cdn_path_dist" : "$cdn-path$",
    "cdn_path_release" : "$cdn-path-release$"
}
