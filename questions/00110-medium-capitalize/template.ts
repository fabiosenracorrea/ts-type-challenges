/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// Disabled to not fix the format, its easier to read like that

type MyCapitalize<Text extends string> =
      Text extends `a${infer P}` ? `A${P}`
    : Text extends `b${infer P}` ? `B${P}`
    : Text extends `c${infer P}` ? `C${P}`
    : Text extends `d${infer P}` ? `D${P}`
    : Text extends `e${infer P}` ? `E${P}`
    : Text extends `f${infer P}` ? `F${P}`
    : Text extends `g${infer P}` ? `G${P}`
    : Text extends `h${infer P}` ? `H${P}`
    : Text extends `i${infer P}` ? `I${P}`
    : Text extends `j${infer P}` ? `J${P}`
    : Text extends `k${infer P}` ? `K${P}`
    : Text extends `l${infer P}` ? `L${P}`
    : Text extends `m${infer P}` ? `M${P}`
    : Text extends `n${infer P}` ? `N${P}`
    : Text extends `o${infer P}` ? `O${P}`
    : Text extends `p${infer P}` ? `P${P}`
    : Text extends `q${infer P}` ? `Q${P}`
    : Text extends `r${infer P}` ? `R${P}`
    : Text extends `s${infer P}` ? `S${P}`
    : Text extends `t${infer P}` ? `T${P}`
    : Text extends `u${infer P}` ? `U${P}`
    : Text extends `v${infer P}` ? `V${P}`
    : Text extends `w${infer P}` ? `W${P}`
    : Text extends `x${infer P}` ? `X${P}`
    : Text extends `y${infer P}` ? `Y${P}`
    : Text extends `z${infer P}` ? `Z${P}`
    : Text
