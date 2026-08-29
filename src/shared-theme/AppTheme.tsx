import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { baseShadows, typography, shadows, shape } from './themePrimitives';
import { buildColorSchemes } from '../theme/interpret';
import { lawCustomizations } from '../theme/laws';
import { mergeComponents } from '../theme/mergeComponents';
import { resolveSeed } from '../seed';
import { useSeedHex } from '../theme/SeedContext';

interface AppThemeProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const { hex } = useSeedHex();
  const theme = React.useMemo(() => {
    if (disableCustomTheme) return {};
    // The color system is the MAP, interpreted — one engine resolve per seed
    // (src/theme/map.ts → src/theme/interpret.ts). baseShadow is the logged
    // shadow gap: template values ride along until the engine's token layer
    // ships in the npm package.
    const mapSchemes = buildColorSchemes(resolveSeed(hex));
    return createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes: {
            light: {
              ...mapSchemes.light,
              palette: { ...mapSchemes.light.palette, baseShadow: baseShadows.light },
            },
            dark: {
              ...mapSchemes.dark,
              palette: { ...mapSchemes.dark.palette, baseShadow: baseShadows.dark },
            },
          },
          typography,
          shadows,
          shape,
          // Slot-wise array merge (docs/customizing-mui.md): the laws load
          // first; area files EXTEND them instead of clobbering.
          components: mergeComponents(
            lawCustomizations,
            inputsCustomizations,
            dataDisplayCustomizations,
            feedbackCustomizations,
            navigationCustomizations,
            surfacesCustomizations,
            themeComponents,
          ),
        });
  }, [disableCustomTheme, themeComponents, hex]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
