import React from 'react';

const createIcon = (name: string) => () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <rect width="16" height="16" fill="#ccc" />
    <text x="2" y="12" fontSize="8" fill="#000">{name}</text>
  </svg>
);

export const ArrowRight = createIcon('→');
export const ArrowLeft = createIcon('←');
export const ArrowRightStop = createIcon('⇥');
export const ArrowLeftStop = createIcon('⇤');
export const Ascending = createIcon('↑');
export const Descending = createIcon('↓');
export const Lock = createIcon('🔒');
export const Menu = createIcon('≡');
export const More = createIcon('⋯');
export const Search = createIcon('🔍');
export const Selection = createIcon('☑');
export const SelectAll = createIcon('✔');
export const ClearSelections = createIcon('✖');
export const SelectPossible = createIcon('?');
export const SelectAlternative = createIcon('↺');
export const SelectExcluded = createIcon('✘');
export const ColumnSize = createIcon('⧉');