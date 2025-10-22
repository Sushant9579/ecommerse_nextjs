declare module 'color-namer' {
  interface ColorName {
    name: string;
    hex: string;
    distance: number;
  }

  interface ColorNames {
    basic: ColorName[];
    ntc: ColorName[];
    pantone: ColorName[];
    html: ColorName[];
  }

  function namer(color: string): ColorNames;
  export = namer;
}

