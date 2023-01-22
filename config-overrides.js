module.exports = {
    webpack: function(config) {
        const bustValue = new Date().getTime();
        config.output.filename = `static/js/[name].${bustValue}.js`;
        config.output.chunkFilename = `static/js/[name].${bustValue}.chunk.js`;
        return config;
    },
};