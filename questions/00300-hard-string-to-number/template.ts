type ToNumber<T extends string> = T extends `${infer P extends number}` ? P : never
