import React from 'react';

interface VotesIconProps {
  width?: string;
  height?: string;
  color?: string; // Add color prop
}

const VotesIcon: React.FC<VotesIconProps> = ({ width = '100%', height = '100%', color = 'fill-quiz-green' }) => (
 <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512">
   <path className={color} fill={color} fill-rule="nonzero" d="M256 512c70.684 0 134.695-28.658 181.019-74.981C483.342 390.695 512 326.691 512 256s-28.658-134.695-74.981-181.019C390.695 28.658 326.691 0 256 0S121.305 28.658 74.981 74.981C28.658 121.305 0 185.309 0 256s28.658 134.695 74.981 181.019C121.305 483.342 185.309 512 256 512zm-79.003-200.641c-30.983 17.861-46.316-6.963-29.012-25.063l88.741-101.046c16.129-16.136 22.426-16.136 38.563 0l88.741 101.046c17.18 18.187 2.203 42.867-29.02 25.063l-79.003-46.932-79.01 46.932z"/>
 </svg>
);

export default VotesIcon;
