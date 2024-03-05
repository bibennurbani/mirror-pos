// src/api/AbstractApi.ts

export abstract class AbstractApi<T> {
    abstract getAll(): Promise<T[] | undefined>;
    abstract getById(id: string): Promise<T | undefined>;
    abstract create(data: T): Promise<T>;
    abstract delete(id: string): Promise<void>;
    abstract update(id: string, newData: T): Promise<void>;
  }
  