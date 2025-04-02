import { writable, type Writable } from "svelte/store";

export function map<T, U>(v: T | null, m: (a: T) => U): U | null {
  return !!v ? m(v) : null;
}

export async function emptyPromiseArray<T>(): Promise<T[]> {
  return [];
}

// Queues & Caches Requests (useful for Svelte Await Blocks)
export class CachePromiser<S, T> {
  private load: (i: S) => Promise<T>;
  private loading: Map<S, Writable<T | null | false>> = new Map();

  get(i: S): Promise<T> {
    if (!this.loading.has(i)) {
      this.loading.set(i, writable(null));
      this.load(i)
        .then((res) => {
          this.loading.get(i)?.set(res);
          return res;
        })
        .catch((_) => {
          this.loading.get(i)?.set(false);
          // Remove invalid user from cache after 1 minute in case of an API misbehavior
          setTimeout(() => {
            this.loading.delete(i);
          }, 60_000);
        });
    }

    return new Promise<T>((resolve, reject) => {
      this.loading.get(i)?.subscribe((v) => {
        if (v === false) {
          reject();
          return;
        }
        if (v !== null) {
          resolve(v);
        }
      });
    });
  }

  constructor(load: (i: S) => Promise<T>) {
    this.load = load;
  }
}
