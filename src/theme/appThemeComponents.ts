// The one merged component-customization set: template x-component
// customizations + the okchroma Clean layer. Every AppTheme consumer
// (dashboard, docs) mounts this same object so examples cannot drift.
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../dashboard/theme/customizations';
import { cleanCustomizations } from './cleanCustomizations';

export const appThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
  // the okchroma Clean layer lands last; overlapping entries array-merge the
  // shared-theme styles internally (see cleanCustomizations.ts)
  ...cleanCustomizations,
};
