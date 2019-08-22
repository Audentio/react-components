const { default_config } = require('@audentio/kinetic/babel');

// remove react-universal
default_config.plugins = default_config.plugins.filter(p => p !== 'universal-import');
default_config.plugins = default_config.plugins.filter(p => p !== '@babel/plugin-syntax-dynamic-import');

module.exports = default_config;
