module.exports = function(config) {
  config.set({
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: [],
    reporters: ['html', 'clear-text', 'progress'],
    packageManager: 'npm',
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    mutate: [
      'lib/**/*.js', 
      '!lib/config/schema.js',
      '!lib/config/parser.js']
  })
}
