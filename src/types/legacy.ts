export interface LenisInstance {
  start(): void;
  stop(): void;
  destroy(): void;
  on(event: string, callback: (...args: unknown[]) => void): void;
}

export interface MissionLanding {
  name: string;
  country: string;
  date: string;
  coordinates: string;
  image: string;
}

export interface CultureRegion {
  name: string;
  imageDirectory: string;
}
