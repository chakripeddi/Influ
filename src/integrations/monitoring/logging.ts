export class Logger {
  constructor(config: { level: string; format: string; transports: any[] }) {}
}

export class FileTransport {
  constructor(filename: string) {}
}

export class ConsoleTransport {
  constructor() {}
}