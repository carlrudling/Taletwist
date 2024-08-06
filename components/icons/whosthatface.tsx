import React from 'react';

interface WhosThatFaceProps {
  width?: string;
  height?: string;
}

const WhosThatFace: React.FC<WhosThatFaceProps> = ({ width = '100%', height = '100%' }) => (
<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_217_1423)">
<path d="M160 79.9978C160 105.182 148.37 127.635 130.194 142.285C127.635 144.352 124.947 146.255 122.143 147.998C117.761 150.73 113.086 153.041 108.189 154.886C99.425 158.19 89.9243 160 80.0022 160C70.0801 160 60.2245 158.128 51.3226 154.7C46.5767 152.877 42.0481 150.615 37.7856 147.958C34.7739 146.086 31.8953 144.015 29.1675 141.766C11.3548 127.102 0 104.876 0 79.9978C0 35.8207 35.8207 0 79.9978 0C124.175 0 159.996 35.8207 159.996 79.9978H160Z" fill="#96D8FF"/>
<path d="M64.5712 77.9318C64.5712 81.6842 61.6615 84.7269 58.0777 84.7269C54.4938 84.7269 50.5596 80.2516 50.5596 76.4947C50.5596 72.7379 51.8547 71.1367 55.4386 71.1367C59.0224 71.1367 64.5712 74.1794 64.5712 77.9318Z" fill="#DE7F61"/>
<path d="M96.3423 77.9318C96.3423 81.6842 99.2519 84.7269 102.836 84.7269C106.42 84.7269 110.354 80.2516 110.354 76.4947C110.354 72.7379 109.059 71.1367 105.475 71.1367C101.891 71.1367 96.3423 74.1794 96.3423 77.9318Z" fill="#DE7F61"/>
<path d="M87.902 97.5H71.5352V125.239H87.902V97.5Z" fill="#DE7F61"/>
<path d="M130.189 142.289C127.63 144.356 124.942 146.259 122.139 148.002C117.757 150.734 113.082 153.045 108.185 154.89C99.4206 158.195 89.9199 160.004 79.9978 160.004C70.0757 160.004 60.2201 158.133 51.3182 154.704C46.5722 152.881 42.0436 150.619 37.7812 147.962C34.7695 146.09 31.8909 144.019 29.1631 141.77C32.8356 135.099 36.8275 128.739 38.8812 128.224C45.2859 126.645 71.5349 118.045 71.5349 118.045C71.5349 118.045 87.7997 118.644 87.8973 118.684C87.9062 118.684 115.078 125.953 120.879 128.22C123.572 129.271 127.444 136.479 130.194 142.285L130.189 142.289Z" fill="#116B9E"/>
<path d="M106.335 67.1178C106.335 86.0926 94.8299 105.493 80.6365 105.493C66.4431 105.493 54.9375 86.0882 54.9375 67.1178C54.9375 48.1474 66.4431 36.7793 80.6365 36.7793C94.8299 36.7793 106.335 48.1429 106.335 67.1178Z" fill="#FD9E80"/>
<path d="M86.4648 31.0351C74.9327 26.919 59.2179 33.1907 53.4473 45.2462C50.5599 51.2785 56.2772 78.5033 56.2772 78.5033L57.2751 76.4896C60.1227 69.7876 60.513 53.7712 64.5715 50.866C69.9384 46.0313 75.3629 48.6793 79.7185 50.3648C88.86 53.9042 94.3111 51.4204 94.3111 51.4204L99.3853 44.5277C97.6644 34.3838 86.4693 31.0351 86.4648 31.0351Z" fill="#A16451"/>
<path d="M94.0229 49.3128C94.0229 49.3128 93.6636 55.9437 98.3785 58.8046C105.409 63.0671 101.426 79.2654 104.814 79.2654C104.814 79.2654 112.301 53.3357 106.846 47.4942C101.39 41.6572 95.0741 44.2386 95.0741 44.2386L94.0185 49.0244V49.3128H94.0229Z" fill="#A16451"/>
<path d="M87.9374 118.696C87.9374 120.4 84.3226 121.784 79.8605 121.784C75.3984 121.784 71.5352 119.748 71.5352 118.044C71.5352 116.341 75.3984 115.609 79.8605 115.609C84.3226 115.609 87.9374 116.993 87.9374 118.696Z" fill="#DE7F61"/>
<path d="M78.5128 79.8409V79.6918C78.5294 78.1091 78.6951 76.8497 79.0099 75.9134C79.3248 74.977 79.7723 74.2189 80.3523 73.6388C80.9323 73.0588 81.6283 72.5244 82.4403 72.0355C82.9292 71.7372 83.3684 71.3851 83.7578 70.979C84.1473 70.5647 84.4538 70.0883 84.6776 69.5497C84.9096 69.0111 85.0256 68.4145 85.0256 67.7599C85.0256 66.9479 84.835 66.2436 84.4538 65.647C84.0727 65.0504 83.5631 64.5906 82.9251 64.2674C82.2871 63.9442 81.5786 63.7827 80.7997 63.7827C80.1203 63.7827 79.4657 63.9235 78.8359 64.2053C78.2062 64.487 77.68 64.9303 77.2575 65.5352C76.8349 66.14 76.5904 66.9313 76.5241 67.9091H73.392C73.4583 66.5005 73.8229 65.2949 74.4858 64.2923C75.157 63.2897 76.0394 62.5232 77.1332 61.9929C78.2352 61.4626 79.4574 61.1974 80.7997 61.1974C82.258 61.1974 83.5258 61.4875 84.603 62.0675C85.6884 62.6475 86.5253 63.4429 87.1136 64.4538C87.7102 65.4647 88.0085 66.6165 88.0085 67.9091C88.0085 68.8205 87.8677 69.645 87.5859 70.3825C87.3125 71.1199 86.9148 71.7786 86.3928 72.3587C85.879 72.9387 85.2576 73.4524 84.5284 73.8999C83.7992 74.3556 83.2151 74.8362 82.7759 75.3416C82.3368 75.8388 82.0178 76.4312 81.8189 77.119C81.62 77.8067 81.5123 78.6643 81.4957 79.6918V79.8409H78.5128ZM80.1037 87.1989C79.4905 87.1989 78.9644 86.9793 78.5252 86.5401C78.0861 86.101 77.8665 85.5748 77.8665 84.9616C77.8665 84.3485 78.0861 83.8223 78.5252 83.3832C78.9644 82.944 79.4905 82.7244 80.1037 82.7244C80.7169 82.7244 81.243 82.944 81.6822 83.3832C82.1213 83.8223 82.3409 84.3485 82.3409 84.9616C82.3409 85.3677 82.2373 85.7405 82.0302 86.0803C81.8313 86.42 81.562 86.6934 81.2223 86.9006C80.8909 87.0994 80.518 87.1989 80.1037 87.1989Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_217_1423">
<rect width="160" height="160" fill="white"/>
</clipPath>
</defs>
</svg>
);

export default WhosThatFace;
