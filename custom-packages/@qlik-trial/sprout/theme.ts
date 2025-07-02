// mock/sprout/theme.ts
import {createTheme} from "@mui/material/styles";

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(min, value), max);
}

function parseColor(input) {
  if (input.type) return input;

  if (input.charAt(0) === "#") {
    return parseColor((function (hex) {
      hex = hex.slice(1);
      const chunkSize = hex.length >= 6 ? 2 : 1;
      const regex = new RegExp(`.{1,${chunkSize}}`, "g");
      let parts = hex.match(regex);

      if (parts && parts[0].length === 1) {
        parts = parts.map(part => part + part);
      }

      return parts ? (
        "rgb" + (parts.length === 4 ? "a" : "") + "(" + parts.map((part, idx) => (
          idx < 3
            ? parseInt(part, 16)
            : Math.round(parseInt(part, 16) / 255 * 1000) / 1000
        )).join(", ") + ")"
      ) : "";
    })(input));
  }

  const parenIndex = input.indexOf("(");
  const type = input.substring(0, parenIndex);

  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(`Invalid color format: ${input}`);
  }

  let colorSpace;
  let values = input.substring(parenIndex + 1, input.length - 1);

  if (type === "color") {
    values = values.split(" ");
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === "/") {
      values[3] = values[3].slice(1);
    }

    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(`Unknown color space: ${colorSpace}`);
    }
  } else {
    values = values.split(",");
  }

  values = values.map(v => parseFloat(v));

  return {
    type,
    values,
    colorSpace
  };
}

function serializeColor(e) {
  const {type, colorSpace} = e;
  let {values} = e;

  if (type.includes("rgb")) {
    values = values.map((v, idx) => idx < 3 ? parseInt(v, 10) : v);
  } else if (type.includes("hsl")) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  let valueStr;
  if (type.includes("color")) {
    valueStr = `${colorSpace} ${values.join(" ")}`;
  } else {
    valueStr = values.join(", ");
  }

  return `${type}(${valueStr})`;
}

function addAlpha(color, alpha) {
  const parsed = parseColor(color);
  const clampedAlpha = clamp(alpha);

  if (parsed.type === "rgb" || parsed.type === "hsl") {
    parsed.type += "a";
  }

  if (parsed.type === "color") {
    parsed.values[3] = `/${clampedAlpha}`;
  } else {
    parsed.values[3] = clampedAlpha;
  }

  return serializeColor(parsed);
}

const FONT_SIZE_1 = 14
const FONT_SIZE_2 = 12
const FONT_SIZE_3 = 16
const SIZE_1 = 25;
const SIZE_2 = 24;
const FONT_WEIGHT_THIN = 300
const FONT_WEIGHT_NORMAL = 400
const FONT_WEIGHT_BLACK = 600
const FONT_WEIGHT_BOLD = 700
const BORDER_RADIUS = 3;
const GRAYSCALE = {
  GREYSCALE_0: "#000000",
  GREYSCALE_5: "#0E0E0E",
  GREYSCALE_10: "#1A1A1A",
  GREYSCALE_15: "#262626",
  GREYSCALE_20: "#333333",
  GREYSCALE_25: "#404040",
  GREYSCALE_30: "#4D4D4D",
  GREYSCALE_35: "#595959",
  GREYSCALE_40: "#666666",
  GREYSCALE_45: "#737373",
  GREYSCALE_50: "#808080",
  GREYSCALE_55: "#8C8C8C",
  GREYSCALE_60: "#999999",
  GREYSCALE_65: "#A6A6A6",
  GREYSCALE_70: "#B3B3B3",
  GREYSCALE_75: "#BFBFBF",
  GREYSCALE_80: "#CCCCCC",
  GREYSCALE_85: "#D9D9D9",
  GREYSCALE_90: "#E6E6E6",
  GREYSCALE_95: "#F2F2F2",
  GREYSCALE_98: "#FAFAFA",
  GREYSCALE_100: "#FFFFFF"
}
export const COLORS = {
  WHITE: "#FFFFFF",
  GREY: "#999999",
  GREY_PALE: "#B2B2B2",
  GREEN: "#00873D",
  GREEN_PALE: "#0AAF54",
  GREEN_DARK: "#0D6932",
  BLUE: "#3F8AB3",
  BLUE_PALE: "#469DCD",
  BLUE_DARK: "#2F607B",
  RED: "#DC373F",
  RED_PALE: "#F05551",
  RED_DARK: "#97322F",
  ORANGE: "#EF960F",
  ORANGE_PALE: "#FFC629",
  ORANGE_DARK: "#A4681C",
  PURPLE: "#655dc6",
  PURPLE_PALE: "#8D8BCE",
  PURPLE_DARK: "#413885",
  ...GRAYSCALE,
  GREYSCALE_0_0: "rgba(0, 0, 0, 0)",
  GREYSCALE_0_03: "rgba(0, 0, 0, 0.03)",
  GREYSCALE_0_05: "rgba(0, 0, 0, 0.05)",
  GREYSCALE_0_06: "rgba(0, 0, 0, 0.06)",
  GREYSCALE_0_10: "rgba(0, 0, 0, 0.1)",
  GREYSCALE_0_15: "rgba(0, 0, 0, 0.15)",
  GREYSCALE_0_20: "rgba(0, 0, 0, 0.2)",
  GREYSCALE_0_25: "rgba(0, 0, 0, 0.25)",
  GREYSCALE_0_30: "rgba(0, 0, 0, 0.3)",
  GREYSCALE_0_42: "rgba(0, 0, 0, 0.42)",
  GREYSCALE_0_55: "rgba(0, 0, 0, 0.55)",
  GREYSCALE_0_60: "rgba(0, 0, 0, 0.6)",
  GREYSCALE_0_65: "rgba(0, 0, 0, 0.65)",
  GREYSCALE_100_05: "rgba(255, 255, 255, 0.05)",
  GREYSCALE_100_15: "rgba(255, 255, 255, 0.15)",
  GREYSCALE_100_25: "rgba(255, 255, 255, 0.25)",
  GREYSCALE_100_50: "rgba(255, 255, 255, 0.5)",
  GREYSCALE_100_60: "rgba(255, 255, 255, 0.6)",
  MISC_FOCUS_BORDER: "#177FE6",
  TEXT_PRIMARY: "#404040",
  TEXT_SECONDARY: "rgba(0, 0, 0, 0.55)"
};
// console.log("Theme create...");

import {ThemeOptions} from "@mui/material/styles";


const FONT = {FONT_FAMILY: "'Source Sans Pro', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif"};

export function createV5ThemeOptions(): ThemeOptions {
  return {
    palette: {
      mode: "light",
      primary: {light: COLORS.GREEN_PALE, main: COLORS.GREEN, dark: COLORS.GREEN_DARK, contrastText: COLORS.WHITE},
      secondary: {light: COLORS.BLUE_PALE, main: COLORS.BLUE, dark: COLORS.BLUE_DARK, contrastText: COLORS.WHITE},
      error: {light: COLORS.RED_PALE, main: COLORS.RED, dark: COLORS.RED_DARK, contrastText: COLORS.WHITE},
      warning: {light: COLORS.ORANGE_PALE, main: COLORS.ORANGE, dark: COLORS.ORANGE_DARK, contrastText: COLORS.WHITE},
      success: {light: COLORS.GREEN_PALE, main: COLORS.GREEN, dark: COLORS.GREEN_DARK, contrastText: COLORS.WHITE},
      info: {light: COLORS.BLUE_PALE, main: COLORS.BLUE, dark: COLORS.BLUE_DARK, contrastText: COLORS.WHITE},
      text: {primary: COLORS.TEXT_PRIMARY, secondary: COLORS.TEXT_SECONDARY, disabled: COLORS.GREYSCALE_0_30},
      action: {hover: COLORS.GREYSCALE_0_03, hoverOpacity: .05, selected: COLORS.GREYSCALE_0_05},
      amethyst: {main: COLORS.PURPLE, light: COLORS.PURPLE_PALE, dark: COLORS.PURPLE_DARK, contrastText: COLORS.WHITE},
      background: {paper: COLORS.WHITE, default: COLORS.GREYSCALE_95},
      divider: COLORS.GREYSCALE_0_15
    },
    breakpoints: {keys: ["xs", "sm", "md", "lg", "xl"], values: {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}},
    spacing: 8,
    shadows: ["none", "0px 1px 2px 0px rgba(0,0,0,0.15)", "0px 1px 2px 0px rgba(0,0,0,0.15)", "0px 1px 2px 0px rgba(0,0,0,0.15)", "0px 1px 2px 0px rgba(0,0,0,0.15)", "0px 1px 2px 0px rgba(0,0,0,0.15)", "0px 1px 2px 0px rgba(0,0,0,0.15)", "0px 2px 4px 0px rgba(0,0,0,0.15)", "0px 2px 4px 0px rgba(0,0,0,0.15)", "0px 2px 4px 0px rgba(0,0,0,0.15)", "0px 2px 4px 0px rgba(0,0,0,0.15)", "0px 2px 4px 0px rgba(0,0,0,0.15)", "0px 2px 4px 0px rgba(0,0,0,0.15)", "0px 4px 10px 0px rgba(0,0,0,0.15)", "0px 4px 10px 0px rgba(0,0,0,0.15)", "0px 4px 10px 0px rgba(0,0,0,0.15)", "0px 4px 10px 0px rgba(0,0,0,0.15)", "0px 4px 10px 0px rgba(0,0,0,0.15)", "0px 4px 10px 0px rgba(0,0,0,0.15)", "0px 6px 20px 0px rgba(0,0,0,0.15)", "0px 6px 20px 0px rgba(0,0,0,0.15)", "0px 6px 20px 0px rgba(0,0,0,0.15)", "0px 6px 20px 0px rgba(0,0,0,0.15)", "0px 6px 20px 0px rgba(0,0,0,0.15)", "0px 6px 20px 0px rgba(0,0,0,0.15)"],
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
      },
      duration: {
        standard: 300,
        short: 250,
        enteringScreen: 225,
        shorter: 200,
        leavingScreen: 195,
        shortest: 150,
        complex: 375
      }
    },
    shape: {borderRadius: BORDER_RADIUS},
    typography: {
      fontSize: FONT_SIZE_1,
      fontWeightLight: FONT_WEIGHT_THIN,
      fontWeightRegular: FONT_WEIGHT_NORMAL,
      fontWeightMedium: FONT_WEIGHT_BLACK,
      fontWeightBold: FONT_WEIGHT_BOLD,
      htmlFontSize: FONT_SIZE_1,
      fontFamily: FONT.FONT_FAMILY,
      button: {fontWeight: FONT_WEIGHT_BLACK, fontSize: FONT_SIZE_1, textTransform: "none"},
      body1: {fontSize: FONT_SIZE_3, lineHeight: "24px"},
      body2: {fontSize: FONT_SIZE_1, lineHeight: "20px"},
      h1: {fontSize: 32, lineHeight: "32px"},
      h2: {fontSize: 28, lineHeight: "32px"},
      h3: {fontSize: SIZE_2, lineHeight: "24px"},
      h4: {fontSize: 20, lineHeight: "24px"},
      h5: {fontSize: FONT_SIZE_3, fontWeight: FONT_WEIGHT_BLACK, lineHeight: "16px"},
      h6: {fontSize: FONT_SIZE_1, fontWeight: FONT_WEIGHT_BLACK, lineHeight: "16px"},
      caption: {color: COLORS.TEXT_SECONDARY},
      subtitle1: {fontSize: FONT_SIZE_1, color: COLORS.TEXT_SECONDARY},
      subtitle2: {fontSize: FONT_SIZE_2, color: COLORS.TEXT_SECONDARY}
    },
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: COLORS.GREYSCALE_98,
            "&:before": {backgroundColor: "unset"},
            "&.Mui-expanded": {margin: "0px"}
          }
        }
      },
      MuiAccordionDetails: {styleOverrides: {root: {backgroundColor: COLORS.WHITE}}},
      MuiAccordionSummary: {
        defaultProps: {},
        styleOverrides: {
          root: {
            padding: "0px 12px 0px 16px",
            minHeight: "auto",
            boxShadow: `inset 0px -1px 0px 0px ${COLORS.GREYSCALE_0_15}`,
            "&.Mui-focusVisible": {
              borderColor: COLORS.MISC_FOCUS_BORDER,
              boxShadow: `inset 0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`,
              borderRadius: BORDER_RADIUS,
              backgroundColor: COLORS.GREYSCALE_0_03
            },
            "&.Mui-expanded": {minHeight: "auto"}
          }, content: {overflow: "hidden", textOverflow: "ellipsis", "&.Mui-expanded": {margin: "12px 0px"}}
        }
      },
      MuiAppBar: {
        defaultProps: {elevation: 0},
        styleOverrides: {
          root: {flex: "0 0 48px", boxShadow: `inset 0 -1px 0 0 ${COLORS.GREYSCALE_0_15}`},
          colorPrimary: {backgroundColor: COLORS.WHITE, color: COLORS.TEXT_PRIMARY}
        }
      },
      MuiBadge: {
        styleOverrides: {
          badge: {height: "16px", minWidth: "16px", fontSize: "12px", padding: "0px 5px"},
          anchorOriginTopRightRectangular: {top: "-3px", right: "-3px"}
        }
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: !0,
          disableTouchRipple: !0,
          focusVisibleClassName: "sprout-focus-visible"
        }
      },
      MuiButtonGroup: {
        defaultProps: {disableRipple: !0},
        styleOverrides: {
          root: {height: "32px", lineHeight: "16px", fontSize: 14, borderRadius: BORDER_RADIUS},
          text: {padding: "8px 16px", "&.Mui-focusVisible": {boxShadow: `0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`}},
          outlined: {
            padding: "7px 16px",
            borderColor: COLORS.GREYSCALE_0_15,
            backgroundColor: COLORS.GREYSCALE_100_60,
            "&.Mui-focusVisible": {
              borderColor: COLORS.MISC_FOCUS_BORDER,
              boxShadow: `0 0 0 1px ${COLORS.MISC_FOCUS_BORDER}`
            }
          },
          contained: {
            padding: "8px 16px",
            boxShadow: "none",
            "&:hover": {boxShadow: "none"},
            "&:active": {boxShadow: "none"}
          },
          groupedContainedPrimary: {
            "&:hover": {backgroundColor: COLORS.GREEN_PALE},
            "&:active": {backgroundColor: COLORS.GREEN_DARK},
            "&.Mui-focusVisible": {
              borderColor: COLORS.GREEN_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.GREEN_PALE, .5)}`
            }
          },
          groupedContainedSecondary: {
            "&:hover": {backgroundColor: COLORS.BLUE_PALE},
            "&:active": {backgroundColor: COLORS.BLUE_DARK},
            "&.Mui-focusVisible": {
              borderColor: COLORS.BLUE_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.BLUE_PALE, .5)}`
            }
          }
        },
        variants: [{props: {size: "small"}, style: {height: "24px"}}, {props: {size: "large"}, style: {height: "40px"}}]
      },
      MuiButton: {
        defaultProps: {color: "inherit", disableRipple: !0, focusVisibleClassName: "sprout-focus-visible"},
        styleOverrides: {
          root: {
            height: "32px",
            lineHeight: "16px",
            minWidth: "24px",
            fontSize: 14,
            borderRadius: BORDER_RADIUS,
            "& > i:only-child, & > svg:only-child": {marginLeft: "-9px", marginRight: "-9px"}
          },
          text: {
            padding: "8px 16px",
            "&:active": {backgroundColor: COLORS.GREYSCALE_0_10},
            "&.Mui-focusVisible": {boxShadow: `0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`}
          },
          outlined: ({ownerState: e}) => ({
            padding: "7px 16px",
            borderColor: COLORS.GREYSCALE_0_15,
            backgroundColor: COLORS.GREYSCALE_100_60,
            "&:active": {backgroundColor: COLORS.GREYSCALE_0_10},
            "&.Mui-focusVisible": {
              borderColor: COLORS.MISC_FOCUS_BORDER,
              boxShadow: `0 0 0 1px ${COLORS.MISC_FOCUS_BORDER}`
            }, ..."amethyst" === e.color && {
              borderColor: COLORS.PURPLE,
              "&.Mui-focusVisible": {
                borderColor: COLORS.PURPLE,
                boxShadow: `0 0 0 3px ${addAlpha(COLORS.PURPLE_PALE, .5)}`
              }
            }
          }),
          outlinedPrimary: {
            borderColor: COLORS.GREEN,
            "&.Mui-focusVisible": {borderColor: COLORS.GREEN, boxShadow: `0 0 0 3px ${addAlpha(COLORS.GREEN_PALE, .5)}`}
          },
          outlinedSecondary: {
            borderColor: COLORS.BLUE,
            "&.Mui-focusVisible": {borderColor: COLORS.BLUE, boxShadow: `0 0 0 3px ${addAlpha(COLORS.BLUE_PALE, .5)}`}
          },
          outlinedWarning: {
            borderColor: COLORS.ORANGE,
            "&.Mui-focusVisible": {
              borderColor: COLORS.ORANGE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.ORANGE_PALE, .5)}`
            }
          },
          outlinedError: {
            borderColor: COLORS.RED,
            "&.Mui-focusVisible": {borderColor: COLORS.RED, boxShadow: `0 0 0 3px ${addAlpha(COLORS.RED_PALE, .5)}`}
          },
          contained: ({ownerState: e}) => ({
            color: COLORS.WHITE,
            padding: "8px 16px",
            boxShadow: "none",
            "&:hover": {boxShadow: "none"},
            "&:active": {boxShadow: "none"}, ..."amethyst" === e.color && {
              "&:hover": {backgroundColor: COLORS.PURPLE_PALE},
              "&:active": {backgroundColor: COLORS.PURPLE_DARK},
              "&.Mui-focusVisible": {
                borderColor: COLORS.PURPLE_PALE,
                boxShadow: `0 0 0 3px ${addAlpha(COLORS.PURPLE_PALE, .5)}`
              }
            }
          }),
          containedPrimary: {
            "&:hover": {backgroundColor: COLORS.GREEN_PALE},
            "&:active": {backgroundColor: COLORS.GREEN_DARK},
            "&.Mui-focusVisible": {
              borderColor: COLORS.GREEN_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.GREEN_PALE, .5)}`
            }
          },
          containedSecondary: {
            "&:hover": {backgroundColor: COLORS.BLUE_PALE},
            "&:active": {backgroundColor: COLORS.BLUE_DARK},
            "&.Mui-focusVisible": {
              borderColor: COLORS.BLUE_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.BLUE_PALE, .5)}`
            }
          },
          containedWarning: {
            "&:hover": {backgroundColor: COLORS.ORANGE_PALE},
            "&:active": {backgroundColor: COLORS.ORANGE_DARK},
            "&.Mui-focusVisible": {
              borderColor: COLORS.ORANGE_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.ORANGE_PALE, .5)}`
            }
          },
          containedError: {
            "&:hover": {backgroundColor: COLORS.RED_PALE},
            "&:active": {backgroundColor: COLORS.RED_DARK},
            "&.Mui-focusVisible": {
              borderColor: COLORS.RED_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.RED_PALE, .5)}`
            }
          },
          sizeSmall: {
            fontSize: 12,
            height: "24px",
            "& > svg:only-child, & > i:only-child": {marginLeft: "-7px", marginRight: "-7px"}
          },
          sizeLarge: {
            fontSize: 16,
            height: "40px",
            lineHeight: "20px",
            "& > i:only-child, & > svg:only-child": {marginLeft: "-9px", marginRight: "-9px"}
          },
          textSizeSmall: {padding: "4px 11px"},
          textSizeLarge: {padding: "10px 19px"},
          outlinedSizeSmall: {padding: "3px 11px"},
          outlinedSizeLarge: {padding: "9px 19px"},
          containedSizeSmall: {padding: "4px 11px"},
          containedSizeLarge: {padding: "10px 19px"}
        },
        variants: []
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            height: "100%",
            "&.MuiCardActionArea-focusHighlight": {opacity: 0},
            "&:hover": {
              boxShadow: "none",
              backgroundColor: COLORS.GREYSCALE_0_03,
              "&.MuiCardActionArea-focusHighlight": {opacity: 0}
            },
            "&:active": {backgroundColor: COLORS.GREYSCALE_95, boxShadow: "none"},
            "&.Mui-focusVisible": {
              borderRadius: BORDER_RADIUS,
              boxShadow: `inset 0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`,
              "&.MuiCardActionArea-focusHighlight": {opacity: 0}
            }
          }
        }
      },
      MuiChip: {
        defaultProps: {},
        styleOverrides: {
          root: {
            height: "24px",
            color: COLORS.TEXT_PRIMARY,
            backgroundColor: COLORS.GREYSCALE_100_15,
            "&.sprout-focus-visible": {
              borderColor: COLORS.MISC_FOCUS_BORDER,
              boxShadow: `0px 0px 0px 1px ${COLORS.MISC_FOCUS_BORDER}`
            },
            "&.Mui-disabled": {
              backgroundColor: COLORS.GREYSCALE_0_05,
              color: COLORS.GREYSCALE_0_30,
              border: "none",
              opacity: 1
            },
            "&.MuiChip-outlinedSuccess": {color: COLORS.GREEN, borderColor: COLORS.GREEN},
            "&.MuiChip-outlinedInfo": {color: COLORS.BLUE, borderColor: COLORS.BLUE},
            "&.MuiChip-outlinedWarning": {color: COLORS.ORANGE, borderColor: COLORS.ORANGE},
            "&.MuiChip-outlinedError": {color: COLORS.RED, borderColor: COLORS.RED}
          },
          outlined: {
            border: `solid 1px ${COLORS.GREYSCALE_0_15}`,
            backgroundColor: COLORS.GREYSCALE_100_15,
            "&.MuiChip-deleteIconSmall": {height: 13, color: "inherit"}
          },
          outlinedPrimary: {color: COLORS.GREEN, borderColor: COLORS.GREEN},
          outlinedSecondary: {color: COLORS.BLUE, borderColor: COLORS.BLUE},
          label: {fontFamily: FONT.FONT_FAMILY, lineHeight: "16px"}
        }
      },
      MuiAutocomplete: {
        defaultProps: {
          forcePopupIcon: !0
        },
        styleOverrides: {
          root: {"& .MuiAutocomplete-endAdornment > button": {border: "none", backgroundColor: "unset"}},
          input: {"&.MuiAutocomplete-input": {padding: "6px 4px"}},
          inputRoot: {padding: "0px 2px", boxSizing: "border-box", borderRadius: BORDER_RADIUS},
          listbox: {paddingTop: 0, paddingBottom: 0},
          option: {
            height: "32px",
            '&.MuiAutocomplete-option[aria-selected="true"]': {
              backgroundColor: COLORS.GREYSCALE_0_05,
              "&.Mui-focused": {backgroundColor: COLORS.GREYSCALE_0_10},
              "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03}
            }
          },
          endAdornment: {top: "auto", bottom: "4px", right: "4px !important", position: "absolute"},
          popupIndicator: {
            borderRadius: BORDER_RADIUS,
            border: `solid 1px ${COLORS.GREYSCALE_0_15}`,
            color: COLORS.GREYSCALE_0_60,
            marginRight: 0,
            width: SIZE_1,
            height: SIZE_1
          },
          paper: {marginTop: "4px", boxShadow: `0px 2px 4px 0px ${COLORS.GREYSCALE_0_15}`},
          clearIndicator: {borderRadius: BORDER_RADIUS, marginRight: "4px"},
          popupIndicatorOpen: {backgroundColor: COLORS.GREYSCALE_0_10}
        }
      },
      MuiFormControlLabel: {styleOverrides: {root: {marginLeft: "-10px"}, label: {fontSize: FONT_SIZE_1}}},
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: FONT_SIZE_2,
            lineHeight: "16px",
            margin: "4px 0 0 0",
            "&.Mui-error": {color: COLORS.RED}
          }, contained: {marginLeft: 0, marginRight: 0}
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: COLORS.GREYSCALE_25,
            fontSize: FONT_SIZE_2,
            fontFamily: FONT.FONT_FAMILY,
            fontWeight: FONT_WEIGHT_BLACK,
            fontStretch: "normal",
            fontStyle: "normal",
            letterSpacing: "normal",
            lineHeight: 1,
            "&.Mui-focused": {color: COLORS.TEXT_PRIMARY},
            "&.Mui-error": {color: COLORS.TEXT_SECONDARY},
            "&[optional=true]": {
              "&:after": {
                color: COLORS.TEXT_SECONDARY,
                content: "'(optional)'",
                fontWeight: FONT_WEIGHT_NORMAL,
                marginLeft: "4px"
              }
            }
          },
          asterisk: {
            visibility: "collapse",
            display: "inline-flex",
            "&::after": {
              visibility: "visible",
              color: COLORS.TEXT_SECONDARY,
              content: "'(required)'",
              fontWeight: FONT_WEIGHT_NORMAL,
              marginLeft: "4px"
            }
          }
        }
      },
      MuiOutlinedInput: {
        defaultProps: {notched: !1}, styleOverrides: {
          root: {
            fontSize: FONT_SIZE_1,
            lineHeight: "16px",
            backgroundColor: COLORS.WHITE,
            borderRadius: BORDER_RADIUS,
            "&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${COLORS.GREYSCALE_0_05}`,
              borderColor: COLORS.GREYSCALE_0_30
            },
            "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${COLORS.MISC_FOCUS_BORDER}`,
              boxShadow: `0px 0px 0px 1px ${COLORS.MISC_FOCUS_BORDER}, inset 0 2px 0 0 ${COLORS.GREYSCALE_0_05}`
            },
            "&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${COLORS.RED}`,
              boxShadow: `0px 0px 0px 1px ${COLORS.RED}, inset 0 2px 0 0 ${COLORS.GREYSCALE_0_05}`
            },
            "&.Mui-disabled": {backgroundColor: "transparent"},
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${COLORS.GREYSCALE_0_10}`,
              borderColor: COLORS.GREYSCALE_0_10,
              backgroundColor: COLORS.GREYSCALE_0_05
            }
          },
          adornedStart: {paddingLeft: 0},
          adornedEnd: {paddingRight: 0},
          input: {color: COLORS.TEXT_PRIMARY, padding: "6px 12px", "&.Mui-disabled": {opacity: .45}},
          inputSizeSmall: {padding: "0px 12px"},
          notchedOutline: {
            borderColor: COLORS.GREYSCALE_0_15,
            borderRadius: BORDER_RADIUS,
            boxShadow: `inset 0 2px 0 0 ${COLORS.GREYSCALE_0_05}`
          },
          multiline: {padding: "0"}
        }
      },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            anchorOrigin: {vertical: "bottom", horizontal: "left"},
            transformOrigin: {vertical: "top", horizontal: "left"}
          }
        },
        styleOverrides: {
          select: {
            padding: "7px 12px",
            borderRadius: "3px !important",
            minHeight: "1em",
            "& em": {color: COLORS.TEXT_SECONDARY},
            "& ~svg": {position: "absolute", right: "12px", top: "unset", cursor: "pointer"},
            "&[aria-expanded=true]": {backgroundColor: COLORS.GREYSCALE_0_05},
            "& ~fieldset": {
              boxShadow: "none !important",
              border: "none !important",
              backgroundColor: "unset !important"
            },
            "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03},
            "&:active": {backgroundColor: COLORS.GREYSCALE_0_10},
            "&:focus": {
              backgroundColor: COLORS.GREYSCALE_0_03,
              borderRadius: "3px !important",
              border: `solid 1px ${COLORS.MISC_FOCUS_BORDER}`,
              boxShadow: `inset 0px 0px 0px 1px ${COLORS.MISC_FOCUS_BORDER}`
            },
            "&.Mui-disabled": {
              opacity: "unset",
              color: COLORS.GREYSCALE_0_30,
              "&:hover": {backgroundColor: COLORS.GREYSCALE_0_0, borderColor: COLORS.GREYSCALE_0_15},
              "& ~svg": {color: COLORS.GREYSCALE_0_30}
            }
          }, outlined: {border: `solid 1px ${COLORS.GREYSCALE_0_15}`}, nativeInput: {height: "42px"}
        }
      },
      MuiIconButton: {styleOverrides: {root: {borderRadius: BORDER_RADIUS}}},
      MuiInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              borderColor: COLORS.MISC_FOCUS_BORDER,
              boxShadow: `0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`
            }
          }
        }
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {padding: "4px 8px", color: COLORS.GREYSCALE_55},
          positionStart: {marginRight: 0},
          positionEnd: {marginLeft: 0}
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {fieldset: {boxShadow: "none"}},
          input: {
            fontSize: FONT_SIZE_1,
            padding: "8px 12px",
            lineHeight: "16px",
            "&.MuiInputBase-inputAdornedStart": {paddingLeft: 0},
            "&.MuiInputBase-inputAdornedEnd": {paddingRight: 0}
          },
          sizeSmall: {height: "24px", input: {fontSize: FONT_SIZE_2, paddingLeft: "8px"}}
        }
      },
      MuiInputLabel: {
        defaultProps: {shrink: !0},
        styleOverrides: {
          outlined: {
            fontSize: FONT_SIZE_2,
            fontWeight: FONT_WEIGHT_BLACK,
            color: COLORS.GREYSCALE_25,
            "&.MuiInputLabel-shrink": {transform: "translate(0px, -16px)", fontWeight: FONT_WEIGHT_BLACK}
          }
        }
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            minWidth: "160px",
            top: "60px",
            marginTop: "5px",
            "&ul": {padding: "0px"},
            boxShadow: `0px 4px 10px ${COLORS.GREYSCALE_0_15}, 0px 0px 0px 1px ${COLORS.GREYSCALE_0_05}`
          }
        }
      },
      MuiRadio: {
        defaultProps: {
          size: "small",
        },
        styleOverrides: {
          root: {
            "&:hover": {backgroundColor: "unset"},
            fill: COLORS.GREYSCALE_100_60,
            stroke: "black",
            "&.sprout-focus-visible": {borderColor: "transparent", boxShadow: "none"},
            "&.sprout-focus-visible i": {borderRadius: "50%", boxShadow: `0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`},
            "&.Mui-checked": {
              "&.MuiRadio-colorPrimary": {
                "&.sprout-focus-visible i": {
                  borderColor: COLORS.GREEN_PALE,
                  boxShadow: `0 0 0 3px ${addAlpha(COLORS.GREEN_PALE, .5)}`
                }
              },
              "&.MuiRadio-colorSecondary": {
                "&.sprout-focus-visible i": {
                  borderColor: COLORS.BLUE_PALE,
                  boxShadow: `0 0 0 3px ${addAlpha(COLORS.BLUE_PALE, .5)}`
                }
              },
              "&.Mui-disabled": {color: COLORS.GREYSCALE_0_20}
            },
            "&.Mui-disabled": {fill: COLORS.GREYSCALE_0_20, stroke: "none"}
          }
        }
      },
      MuiCheckbox: {
        defaultProps: {
          size: "small",
        },
        styleOverrides: {
          root: {
            borderWidth: 1,
            "&:hover": {backgroundColor: "unset"},
            "&.sprout-focus-visible": {borderColor: "transparent", boxShadow: "none"},
            "&.sprout-focus-visible i": {
              borderRadius: BORDER_RADIUS,
              boxShadow: " 0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #177FE6"
            },
            "&:not(.Mui-disabled)": {
              "&:not(.Mui-checked)": {
                "&:not(.MuiCheckbox-indeterminate)": {
                  color: COLORS.GREYSCALE_100_60,
                  "&:hover": {g: {rect: {stroke: COLORS.GREYSCALE_0_55, color: COLORS.GREYSCALE_0_03}}},
                  "&.sprout-focus-visible i": {boxShadow: "0px 0px 0px 2px #0275D9", g: {rect: {stroke: "none"}}}
                }
              }
            },
            "&.Mui-disabled": {
              "& i": {
                pointerEvents: "auto",
                cursor: "not-allowed !important",
                color: COLORS.GREYSCALE_0_15,
                g: {rect: {stroke: "none"}}
              }
            }
          },
          colorPrimary: {"&.MuiCheckbox-root": {"&:not(.Mui-disabled)": {"&:hover": {color: COLORS.GREEN_DARK}}}},
          colorSecondary: {
            "&.MuiCheckbox-root": {
              "&:not(.Mui-disabled)": {
                color: COLORS.GREYSCALE_0_55,
                "&:hover": {color: COLORS.GREYSCALE_25}
              }
            }
          }
        }
      },
      MuiCircularProgress: {defaultProps: {thickness: 3, disableShrink: !0}},
      MuiDataGrid: {
        defaultProps: {
          className: "sprout-data-grid-pro",
          slotProps: {toolbar: {className: "sprout-data-grid-pro-toolbar"}}
        },
        styleOverrides: {
          root: {
            borderColor: COLORS.GREYSCALE_85,
            borderRadius: 0,
            "& .sprout-data-grid-pro-toolbar": {
              marginTop: 0,
              "& .sprout-data-grid-pro-filter-search-icon": {
                paddingLeft: "8px",
                paddingRight: "4px",
                color: COLORS.GREYSCALE_55
              },
              "& > div": {
                "&:after": {borderBottom: `1px solid ${COLORS.GREYSCALE_0_15}`},
                "&:hover::before": {borderBottom: `1px solid ${COLORS.GREYSCALE_0_15}`}
              }
            }
          },
          columnHeaders: {backgroundColor: COLORS.GREYSCALE_98},
          withBorderColor: {
            borderColor: COLORS.GREYSCALE_85,
            "&.MuiDataGrid-cell--withRightBorder:last-of-type": {borderRightWidth: 0},
            "&.MuiDataGrid-columnHeader--withRightBorder:last-of-type": {borderRightWidth: 0}
          },
          row: {
            "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03},
            "&.MuiDataGrid-row.Mui-selected": {
              backgroundColor: COLORS.GREYSCALE_0_05,
              "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03}
            }
          },
          menu: {"& svg.MuiSvgIcon-root": {fontSize: FONT_SIZE_3}},
          filterIcon: {fontSize: FONT_SIZE_3},
          pinnedColumnHeaders: {backgroundColor: COLORS.GREYSCALE_98},
          pinnedColumns: {backgroundColor: COLORS.WHITE}
        }
      },
      MuiDialog: {defaultProps: {fullWidth: !0}},
      MuiDialogActions: {styleOverrides: {root: {padding: "16px"}}},
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "content-box",
            minHeight: "31px",
            padding: "16px 16px 16px 24px",
            fontSize: "16px",
            lineHeight: "24px"
          }
        }
      },
      MuiDialogContentText: {defaultProps: {variant: "body2"}, styleOverrides: {root: {marginBottom: 0}}},
      MuiDialogContent: {styleOverrides: {root: {padding: "16px 24px !important"}}},
      MuiDivider: {styleOverrides: {middle: {margin: "4px 8px"}}},
      MuiLink: {defaultProps: {underline: "none", color: COLORS.MISC_FOCUS_BORDER}},
      MuiListItemIcon: {styleOverrides: {root: {color: COLORS.GREYSCALE_25, minWidth: "16px", marginRight: "16px"}}},
      MuiListItemText: {
        styleOverrides: {
          root: {fontSize: "12px"},
          primary: {
            fontSize: FONT_SIZE_1,
            color: COLORS.TEXT_PRIMARY,
            lineHeight: "16px",
            fontWeight: FONT_WEIGHT_BLACK
          },
          secondary: {
            fontSize: FONT_SIZE_2,
            color: COLORS.GREYSCALE_45,
            fontWeight: FONT_WEIGHT_NORMAL,
            lineHeight: "16px"
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {fontSize: FONT_SIZE_1, minHeight: "32px"},
          gutters: {paddingLeft: "12px", paddingRight: "12px"},
          button: {
            "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03},
            "&:active": {backgroundColor: COLORS.GREYSCALE_0_05}
          }
        }
      },
      MuiListItemButton: {styleOverrides: {root: {fontSize: FONT_SIZE_1, height: "32px"}}},
      MuiListSubheader: {
        styleOverrides: {
          root: {
            '&[role="option"]': {
              color: COLORS.TEXT_PRIMARY,
              lineHeight: 1.33,
              padding: "4px 12px",
              fontWeight: 600,
              fontSize: FONT_SIZE_2,
              borderBottom: `solid 1px ${COLORS.GREYSCALE_0_15}`,
              pointerEvents: "none"
            }
          }
        }
      },
      MuiList: {styleOverrides: {padding: {paddingTop: "0px", paddingBottom: "0px"}}},
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: FONT_SIZE_1,
            color: COLORS.GREYSCALE_25,
            height: "32px",
            '[class*="MuiListItemIcon-root"]': {minWidth: "16px"},
            "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03},
            "&.Mui-selected": {
              backgroundColor: "unset",
              "&:hover": {backgroundColor: COLORS.GREYSCALE_0_10},
              "&.Mui-focusVisible": {backgroundColor: COLORS.GREYSCALE_0_10},
              "&:not(.Mui-disabled)": {
                "&::after": {
                  content: "url('data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%228px%22%20height%3D%227px%22%20viewBox%3D%220%200%208%207%22%20version%3D%221.1%22%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20aria-labelledby%3D%22Tick%22%3E%20%20%3Cg%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%3Cg%20transform%3D%22translate%280.000000%2C%20-1.000000%29%22%3E%20%20%20%20%20%20%3Cpath%20d%3D%22M7.51662484%2C1.29325%20C7.12545778%2C0.90225%206.49218732%2C0.90225%206.10202068%2C1.29325%20L2.73658335%2C4.65725%20L1.90722914%2C3.82925%20C1.5170625%2C3.43825%200.883792042%2C3.43825%200.492624979%2C3.82925%20C0.102458344%2C4.21925%200.102458344%2C4.85225%200.492624979%2C5.24325%20L2.02928127%2C6.77825%20C2.4194479%2C7.16925%203.05271836%2C7.16925%203.44388542%2C6.77825%20L7.51662484%2C2.70725%20C7.9077919%2C2.31725%207.9077919%2C1.68425%207.51662484%2C1.29325%22%3E%3C%2Fpath%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%3C%2Fsvg%3E')",
                  fontFamily: "LUI icons",
                  position: "absolute",
                  fontSize: "10px",
                  right: "10px",
                  color: COLORS.RED
                }
              }
            },
            "&.Mui-focusVisible": {backgroundColor: COLORS.GREYSCALE_0_03}
          }, divider: {marginTop: "8px", marginBottom: "8px"}, gutters: {paddingLeft: "12px", paddingRight: "12px"}
        }
      },
      MuiMenu: {
        styleOverrides: {
          list: {paddingTop: "4px", paddingBottom: "4px"},
          paper: {
            marginTop: "4px !important",
            marginBottom: "4px",
            background: COLORS.WHITE,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 4px 10px 0 rgba(0,0,0,0.15) !important",
            borderRadius: "2px !important"
          }
        }
      },
      MuiSlider: {
        styleOverrides: {
          root: {color: COLORS.GREEN, height: "24px", "&.Mui-disabled": {color: COLORS.GREYSCALE_0_15}},
          rail: {
            backgroundColor: COLORS.GREYSCALE_0_05,
            height: "4px",
            opacity: "1",
            border: `solid 1px ${COLORS.GREYSCALE_0_05}`,
            borderRadius: BORDER_RADIUS,
            boxShadow: `inset 0px 0px 0px 1px ${COLORS.GREYSCALE_0_05}`
          },
          track: {
            height: "4px",
            backgroundColor: "currentColor",
            opacity: "1",
            border: `solid 1px ${COLORS.GREYSCALE_0_05}`,
            borderRadius: BORDER_RADIUS
          },
          thumb: {
            height: "16px",
            width: "16px",
            borderRadius: BORDER_RADIUS,
            backgroundColor: COLORS.WHITE,
            boxShadow: `0px 1px 2px 0px ${COLORS.GREYSCALE_0_15}, 0px 0px 0px 1px ${COLORS.GREYSCALE_0_05}`,
            "&:hover": {
              borderRadius: BORDER_RADIUS,
              boxShadow: `0 2px 4px 0 ${COLORS.GREYSCALE_0_30}, 0 0 0 1px ${COLORS.GREYSCALE_0_06}`
            },
            "&:focus": {boxShadow: `0 1px 2px 0 ${COLORS.GREYSCALE_0_15}, 0 0 0 1px ${COLORS.GREYSCALE_0_06}, 0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`},
            "&.Mui-focusVisible": {boxShadow: `0 1px 2px 0 ${COLORS.GREYSCALE_0_15}, 0 0 0 1px ${COLORS.GREYSCALE_0_06}, 0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`},
            "&.Mui-disabled": {
              width: "16px",
              height: "16px",
              marginTop: "-5px",
              marginLeft: "-8px",
              backgroundColor: COLORS.GREYSCALE_90
            },
            "& .custom-bar": {
              height: "8px",
              width: "1px",
              backgroundColor: COLORS.GREYSCALE_0_30,
              marginLeft: 1,
              marginRight: 1
            }
          },
          mark: {width: "1px", height: "4px", margin: "16px 0px 0px 0px", backgroundColor: COLORS.GREYSCALE_0_15},
          markActive: {opacity: 1, backgroundColor: COLORS.GREYSCALE_0_15},
          markLabel: {color: COLORS.TEXT_SECONDARY, transform: "translateX(-50%)", top: "35px"},
          markLabelActive: {color: COLORS.TEXT_SECONDARY, transform: "translateX(-50%)", top: "35px"}
        }
      },
      MuiSnackbar: {defaultProps: {anchorOrigin: {vertical: "bottom", horizontal: "center"}}},
      MuiSnackbarContent: {styleOverrides: {root: {backgroundColor: COLORS.WHITE, color: COLORS.GREYSCALE_25}}},
      MuiSwitch: {
        defaultProps: {color: "primary", size: "small"}, styleOverrides: {
          root: {
            padding: "10px",
            width: "60px",
            height: "40px",
            "& .MuiSwitch-switchBase": {
              "&:hover": {backgroundColor: "unset"},
              "&.Mui-checked": {"&:hover": {backgroundColor: "unset"}}
            }
          },
          switchBase: {
            padding: "12px",
            "&.Mui-disabled": {"&.MuiSwitch-thumb": {backgroundColor: COLORS.GREYSCALE_100_50}},
            "&.Mui-checked + .MuiSwitch-track": {opacity: 1},
            "&.Mui-disabled + .MuiSwitch-track": {opacity: .12},
            "&.sprout-focus-visible": {borderColor: "transparent", boxShadow: "none"}
          },
          colorPrimary: {
            "&.sprout-focus-visible + .MuiSwitch-track": {
              borderColor: COLORS.GREEN_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.GREEN_PALE, .5)}`
            }
          },
          colorSecondary: {
            "&.sprout-focus-visible + .MuiSwitch-track": {
              borderColor: COLORS.BLUE_PALE,
              boxShadow: `0 0 0 3px ${addAlpha(COLORS.BLUE_PALE, .5)}`
            }
          },
          track: {opacity: 1, backgroundColor: COLORS.GREYSCALE_0_15, borderRadius: BORDER_RADIUS},
          thumb: {height: "16px", width: "16px", borderRadius: BORDER_RADIUS, backgroundColor: COLORS.GREYSCALE_100},
          sizeSmall: {
            height: "32px",
            width: "52px",
            padding: "8px 10px",
            "& .MuiSwitch-thumb": {height: "12px", width: "12px"},
            "& .MuiSwitch-switchBase": {padding: "10px 12px"}
          }
        }
      },
      MuiTextField: {defaultProps: {margin: "dense", variant: "outlined"}, styleOverrides: {root: {marginBottom: 0}}},
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: FONT_SIZE_1,
            fontWeight: FONT_WEIGHT_BLACK,
            textTransform: "none",
            minWidth: "auto",
            boxSizing: "border-box",
            paddingBottom: "12px",
            "&:hover": {borderBottom: `2px solid ${COLORS.GREYSCALE_80}`, paddingBottom: "10px"},
            "&.sprout-focus-visible": {
              boxShadow: `inset 0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`,
              backgroundColor: COLORS.GREYSCALE_0_03,
              borderRadius: BORDER_RADIUS
            },
            "&.Mui-disabled": {opacity: .3}
          },
          textColorPrimary: {color: COLORS.GREYSCALE_25, "&.Mui-selected": {color: COLORS.GREYSCALE_25}},
          textColorInherit: {opacity: "unset"},
          labelIcon: {minWidth: "40px", minHeight: "48px"}
        }
      },
      MuiTabs: {
        defaultProps: {indicatorColor: "primary", textColor: "primary"},
        styleOverrides: {
          root: {fontSize: FONT_SIZE_1, fontWeight: "bold"},
          scroller: {height: "100%"},
          flexContainer: {height: "100%", marginLeft: 2, marginRight: 2},
          indicator: {height: 2},
          vertical: {
            borderRight: `1px solid ${COLORS.GREYSCALE_0_15}`,
            "& .MuiTab-root": {
              "&:hover": {
                borderBottomColor: "transparent",
                boxShadow: `2px 0px 0px ${COLORS.GREYSCALE_80}`
              }
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "0px 8px 0px 16px",
            borderBottom: `1px solid ${COLORS.GREYSCALE_85}`,
            borderRight: `1px solid ${COLORS.GREYSCALE_85}`,
            height: "39px"
          },
          head: {height: "41px", fontWeight: FONT_WEIGHT_BLACK, backgroundColor: COLORS.GREYSCALE_98},
          paddingCheckbox: {width: "40px", padding: "0px"},
          paddingNone: {padding: "0px"},
          sizeSmall: {
            padding: "0px 8px",
            height: "29px",
            "&.MuiTableCell-head": {height: "31px"},
            "&.MuiTableCell-paddingCheckbox": {width: "40px", padding: "0px"}
          },
          stickyHeader: {backgroundColor: COLORS.GREYSCALE_98, borderBottom: `1px solid ${COLORS.GREYSCALE_85}`}
        }
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${COLORS.GREYSCALE_85}`,
            borderTop: `1px solid ${COLORS.GREYSCALE_85}`
          }
        }
      },
      MuiTableHead: {styleOverrides: {root: {backgroundColor: COLORS.GREYSCALE_98}}},
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: COLORS.GREYSCALE_0_05,
              "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03}
            }, "&&:hover": {backgroundColor: COLORS.GREYSCALE_0_03}
          }
        }
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {"& icon": {opacity: .5}},
            "&.Mui-active": {"&& icon": {opacity: 1}}
          },
          icon: {opacity: 0},
          iconDirectionDesc: {transform: "rotate(180deg)"},
          iconDirectionAsc: {transform: "rotate(0deg)"}
        }
      },
      MuiTable: {styleOverrides: {root: {borderLeft: `1px solid ${COLORS.GREYSCALE_85}`}}},
      MuiToggleButton: {
        styleOverrides: {
          root: {
            height: 32,
            lineHeight: 16,
            width: 32,
            fontSize: FONT_SIZE_1,
            borderRadius: BORDER_RADIUS,
            padding: "7px 16px",
            border: `1px solid ${COLORS.GREYSCALE_0_15}`,
            backgroundColor: COLORS.GREYSCALE_100_60,
            color: COLORS.GREYSCALE_25,
            zIndex: 1,
            "&:active": {backgroundColor: COLORS.GREYSCALE_0_10, border: `1px solid ${COLORS.GREYSCALE_0_30}`},
            "&:hover": {backgroundColor: COLORS.GREYSCALE_0_03, border: `1px solid ${COLORS.GREYSCALE_0_30}`},
            "&.sprout-focus-visible": {
              backgroundColor: COLORS.GREYSCALE_0_03,
              boxShadow: `0 0 0 1px ${COLORS.MISC_FOCUS_BORDER}`,
              border: `1px solid ${COLORS.MISC_FOCUS_BORDER}`,
              zIndex: 2
            },
            "&.Mui-selected": {
              color: COLORS.GREYSCALE_25,
              backgroundColor: COLORS.GREYSCALE_0_10,
              zIndex: 2,
              "&:hover": {backgroundColor: COLORS.GREYSCALE_0_10, border: `1px solid ${COLORS.GREYSCALE_0_15}`}
            }
          },
          sizeSmall: {fontSize: FONT_SIZE_2, height: 24, width: 24, padding: 7},
          sizeLarge: {fontSize: FONT_SIZE_3, height: 40, width: 40, lineHeight: 20}
        }
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            height: "32px",
            lineHeight: "16px",
            fontSize: FONT_SIZE_1,
            borderRadius: BORDER_RADIUS
          }
        }
      },
      MuiToolbar: {
        defaultProps: {disableGutters: !0},
        styleOverrides: {
          root: {display: "flex", flex: 1, padding: "0 16px"},
          dense: {minHeight: "46px", padding: "0 8px"}
        }
      },
      MuiTooltip: {
        defaultProps: {arrow: !0},
        styleOverrides: {
          arrow: {color: COLORS.GREYSCALE_20},
          tooltip: {backgroundColor: COLORS.GREYSCALE_20, fontSize: FONT_SIZE_2, lineHeight: "16px"},
          popper: {whiteSpace: "pre-line"}
        }
      }
    }
  };
}
