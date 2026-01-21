import { runCli } from '../dist/cli/cliRun.js';
import { logger, setLogLevel, repomixLogLevels } from '../dist/shared/logger.js';

// Set log level to see what's happening
setLogLevel(repomixLogLevels.DEBUG);

console.log('Starting CLI test...');

// Run a minimal test
runCli(['.'], process.cwd(), { verbose: true })
  .then(result => {
    console.log('CLI run completed successfully:', !!result);
  })
  .catch(error => {
    console.error('CLI run failed:', error.message);
    console.error('Stack:', error.stack);
  });