type First<T extends unknown[]> = T extends [unknown, ...unknown[]] ? T[0] : never

type EnsureFirst<T extends [unknown, ...unknown[]]> = T[0]
