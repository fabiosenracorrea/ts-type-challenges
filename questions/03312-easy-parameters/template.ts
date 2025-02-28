type MyParameters<T extends (...args: any) => any> = T extends (...p: infer P) => any ? P : never
