require('../env');

var _ = require('lodash');
var path = require('path');
var configDir = path.join(__dirname, '../config/');

function Config(filename, options, env) {
    if (!options) {
        options = {};
    }

    if (typeof options == 'string') {
        env = options;
    }

    if (!env) {
        env = process.env.NODE_ENV || 'development';
    }

    this.options = _.extend({
                'delimiter': '.',
                'envs': ['development', 'test', 'production']
            }, options);

    Config._cache = Config._cache || {};

    if (Config._cache[filename + env]) {
        this.items = Config._cache[filename + env];
    } else {
        var cfg;
        try {
            cfg = require(path.join(configDir, filename));
        } catch (e) {
            console.warn('config of ' + filename + ' error: ' + e);
            cfg = {};
        }
        this.items = Config._cache[filename + env] = _.extend(
            _.omit(cfg, this.options.envs), 
            cfg[env] || {}
        );
    } 
}

Config.prototype.item = function(key, val) {
    if (!key) {
        return this.items;
    }

    if (Array.isArray(key)) {
        return _.pick(this.items, key);
    }

    if (typeof key == 'string') {
        var base = this.items, 
            key = key, 
            dIndex;

        if ((dIndex = key.lastIndexOf(this.options.delimiter)) > -1) {
            base = this.namespace(key.substring(0, dIndex), typeof val != 'undefined');
            key = key.substring(dIndex + 1);
        }

        if (typeof val == 'undefined') {
            return base[key] && !base[key].__isFakeNode__ ? base[key] : undefined;
        } else {
            base[key] = val;

        }
    }
};

Config.prototype.namespace = function(ns, isSetMode = false) {
    var node = this.items,
        ns = ns.split(this.options.delimiter);

    ns.forEach(function(n) {
        if (typeof node[n] == 'undefined') {
            node[n] = {
                __isFakeNode__: true
            };
        }
        node = node[n];
        // clean the __isFakeNode__ flag while set mode
        if (isSetMode) {
            delete node.__isFakeNode__;
        }
    });

    return node;
};

function config(filename, options, env) {
    return new Config(filename, options, env);
}

config.path = function() {
    return configDir;
};

config.root = function() {
    return process.env.ROOTPATH || path.resolve(__dirname, '..');
};

module.exports = config;
