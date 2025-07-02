import React from 'react';

export default function Lock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" height="12px"
         fill="currentColor" aria-hidden="true" role="img" data-testid="head-cell-lock-icon"
         data-darkreader-inline-fill="" style="--darkreader-inline-fill: currentColor;">
      <defs>
        <path id="lock_svg__lock-a"
              d="M13 7H8h5V4.982C13 2.23 10.761 0 8 0S3 2.23 3 4.982V7h.75H3h1.5V5.332C4.5 3.216 5.549 1.5 8 1.5s3.5 1.716 3.5 3.832V7h.75H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H3h10Z"></path>
      </defs>
      <use xlink:href="#lock_svg__lock-a" fill-rule="evenodd"></use>
    </svg>
  );
}
