import pc from 'picocolors';
import type { CliOptions } from './types.js';

// Simple spinner without external dependencies
const dotsFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const dotsInterval = 80;

export class Spinner {
  private message: string;
  private currentFrame = 0;
  private interval: ReturnType<typeof setInterval> | null = null;
  private readonly isQuiet: boolean;
  private startTime: number;

  constructor(message: string, cliOptions: CliOptions) {
    this.message = message;
    // If the user has specified the verbose flag, don't show the spinner
    this.isQuiet = cliOptions.quiet || cliOptions.verbose || cliOptions.stdout || false;
    this.startTime = Date.now();
  }

  start(): void {
    if (this.isQuiet) {
      console.log(`${pc.cyan('ℹ')} ${this.message}`);
      return;
    }

    const framesLength = dotsFrames.length;
    console.log(`${pc.cyan(dotsFrames[0])} ${this.message}`);

    this.interval = setInterval(() => {
      this.currentFrame++;
      const frame = dotsFrames[this.currentFrame % framesLength];
      // Overwrite the previous line with carriage return
      process.stdout.write(`\r${pc.cyan(frame)} ${this.message}`);
    }, dotsInterval);
  }

  update(message: string): void {
    if (this.isQuiet) {
      console.log(`${pc.cyan('ℹ')} ${message}`);
      return;
    }

    this.message = message;
    if (!this.isQuiet) {
      process.stdout.write(`\r${pc.cyan(dotsFrames[this.currentFrame % 10])} ${this.message}`);
    }
  }

  stop(finalMessage: string): void {
    if (this.isQuiet) {
      return;
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    // Clear the spinner line and print final message
    process.stdout.write(`\r${' '.repeat(process.stdout.columns || 80)}\r`);
    console.log(finalMessage);
  }

  succeed(message: string): void {
    if (this.isQuiet) {
      console.log(`${pc.green('✔')} ${message}`);
      return;
    }

    this.stop(`${pc.green('✔')} ${message}`);
  }

  fail(message: string): void {
    if (this.isQuiet) {
      console.error(`${pc.red('✖')} ${message}`);
      return;
    }

    this.stop(`${pc.red('✖')} ${message}`);
  }
}
