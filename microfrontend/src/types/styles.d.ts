interface ThemeInterface {
  readonly epo: {
    colors: Colors;
    spacing: Sizes;
    fontSize: Sizes;
  };
  readonly transition: {
    fast: number;
    mild: number;
    slow: number;
  };
  readonly outline: number;
}

interface Colors {
  primary: string;
  secondary: string;
  baseWhite: string;
  baseBlack: string;
  baseGreyDark: string;
  baseGreyLight: string;
  baseBorder: string;
  shadow: string;
  baseBg: string;
  barsBg: string;
  buttonBg: string;
  baseSteel: string;
  corporateRed: string;
  warnOrange: string;
  lightBlue: string;
  baseGreen: string;
  tagBg: string;
  baseText: string;
  tagClick: string;
  blue10: string;
  blue50: string;
  yellow: string;
  yellow10: string;
  yellow50: string;
  yellowText: string;
  red: string;
  red10: string;
  red50: string;
  redText: string;
  link: string;
  linkVisited: string;
  linkHovered: string;
  outline: string;
  phase: PhaseColor;
  applicationType: NationalSearchColor;
  dossierTypeBg: string;
  dossierTypeBorder: string;
  dossierTypeCountry: string;
  tags: TagsColor;
}

interface Sizes {
  extraSmall: string;
  small: string;
  medium: string;
  big: string;
  bigger: string;
  biggest: string;
}

interface PhaseColor {
  S: string;
  E: string;
  O: string;
  A: string;
  L: string;
}

interface PhaseColor {
  S: string;
  E: string;
  O: string;
  A: string;
  L: string;
}

interface NationalSearchColor {
  default: TypeColor;
  BO: TypeColor;
  CO: TypeColor;
  GO: TypeColor;
  FA: TypeColor;
  IO: TypeColor;
  NO: TypeColor;
  MO: TypeColor;
  SN: TypeColor;
  FS: TypeColor;
  TO: TypeColor;
  LT: TypeColor;
}

interface TypeColor {
  bg: string;
  border: string;
  country: CountryColor;
}

interface CountryColor {
  bg: string;
  color: string;
}

interface TagColour {
  bg: string;
  border: string;
}

export interface TagsColor {
  default: TagColour;
  blue: TagColour;
  red: TagColour;
  orange: TagColour;
  green: TagColour;
}

interface Breakpoints {
  mobileS: number;
  mobileM: number;
  mobileL: number;
  tablet: number;
  laptopS: number;
  laptopM: number;
  laptopL: number;
  laptopXL2: number;
  desktopS: number;
  desktopM: number;
  desktopL: number;
}

export { ThemeInterface, Breakpoints };
