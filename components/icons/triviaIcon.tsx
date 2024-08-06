import React from 'react';

interface TriviaIconProps {
  width?: string;
  height?: string;
}


const TriviaIcon: React.FC<TriviaIconProps> = ({width='100%', height='100%'}) => (
<svg width={width} height={height} viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M141.31 31.5488C141.046 29.4963 140.75 27.2728 139.802 25.1892C139.522 24.5984 139.196 24.0075 138.807 23.4477C138.076 22.4215 137.174 21.5974 136.179 20.9288C134.686 19.9336 133.007 19.2961 131.297 18.8452C129.586 18.4098 127.814 18.1455 126.165 17.9589C116.338 16.8238 106.465 16.3418 96.5755 16.3418C80.9331 16.3418 65.2752 17.5391 49.8039 19.2028C46.7874 19.5294 43.662 20.1824 40.7854 21.3952C37.9088 22.6081 35.281 24.3962 33.3841 26.9929C32.0468 28.8122 31.1916 30.8491 30.6008 32.9482C30.0099 35.0318 29.6834 37.1776 29.4035 39.2456C28.1129 48.7772 27.5376 58.3709 27.5376 67.9803C27.5376 84.1669 29.1858 100.353 31.8758 116.307C32.1868 118.157 32.5599 120.116 33.2441 121.998C33.5862 122.931 34.006 123.848 34.5502 124.703C35.0944 125.559 35.7631 126.352 36.5716 127.036C38.111 128.326 39.9147 129.041 41.7495 129.43C43.5842 129.835 45.4657 129.943 47.2227 130.006C52.2606 130.208 57.2985 130.317 62.3209 130.317C70.1421 130.317 77.9633 130.068 85.7689 129.57C85.8466 130.876 85.8777 132.198 85.8777 133.52C85.8777 141.03 84.696 148.54 82.3636 155.693C82.2548 156.019 82.1926 156.377 82.1926 156.75C82.1926 157.201 82.2859 157.667 82.5191 158.118C82.7524 158.6 83.1411 159.02 83.592 159.269C84.0429 159.533 84.525 159.627 84.9603 159.611C85.5668 159.611 86.1265 159.455 86.6241 159.253C87.1217 159.051 87.5726 158.787 87.9613 158.523C98.4258 151.308 107.693 142.352 115.219 132.105C115.919 131.172 116.867 129.897 117.645 128.886C118.033 128.373 118.375 127.922 118.624 127.595C118.64 127.564 118.671 127.549 118.686 127.518C119.666 127.44 121.827 127.3 124.051 127.16C128.451 126.896 132.867 126.227 137.127 124.843C138.076 124.532 139.102 124.159 140.051 123.63C141.015 123.086 141.932 122.386 142.616 121.376C143.238 120.474 143.565 119.494 143.767 118.53C143.969 117.566 144.031 116.618 144.078 115.731C144.638 106.62 144.918 97.508 144.918 88.3807C144.918 69.3952 143.72 50.4098 141.31 31.5799V31.5488Z" fill="#0C1D3E"/>
<path d="M102.717 116.323C87.3392 117.194 71.1837 115.126 58.8222 105.19C44.7814 93.9011 38.1419 75.0712 38.3907 57.4385C38.5307 47.9691 40.5054 38.3753 44.5015 29.7767C45.9165 26.7135 48.0312 24.008 50.4879 21.6445C50.348 21.6445 50.208 21.6756 50.0681 21.6912C47.2226 22.0022 44.3149 22.6086 41.7493 23.697C39.1837 24.7854 36.9602 26.3248 35.3742 28.4861C34.2702 29.9944 33.5239 31.7514 32.9796 33.6484C32.451 35.5454 32.1244 37.5668 31.8446 39.6037C30.5695 49.0109 30.0098 58.5114 30.0098 68.0119C30.0098 84.0274 31.6424 100.09 34.3169 115.919C34.5501 117.271 34.7989 118.64 35.1721 119.915C35.5297 121.19 36.0117 122.371 36.6492 123.382C37.0846 124.051 37.5822 124.642 38.173 125.155C39.2926 126.103 40.692 126.679 42.278 127.021C43.8484 127.363 45.5899 127.472 47.3159 127.549C52.3071 127.751 57.314 127.86 62.3208 127.86C70.4996 127.86 78.6784 127.58 86.8416 127.036L88.07 126.958L88.1633 128.187C88.2877 129.975 88.3655 131.748 88.3655 133.536C88.3655 141.31 87.1371 149.069 84.7425 156.471C84.7114 156.564 84.6959 156.673 84.6959 156.75C84.6959 156.859 84.7114 156.937 84.7425 156.984C84.8047 157.093 84.8203 157.093 84.8203 157.093C84.8203 157.093 84.8514 157.108 84.9602 157.108C85.1002 157.108 85.38 157.061 85.6599 156.937C85.9553 156.813 86.2663 156.642 86.5462 156.455C96.7931 149.396 105.843 140.626 113.213 130.612C114.628 128.684 117.054 125.543 117.054 125.528L117.396 125.093L117.955 125.046C117.955 125.046 120.863 124.828 123.895 124.642C128.14 124.377 132.354 123.74 136.35 122.434C137.236 122.138 138.107 121.812 138.838 121.407C139.569 121.003 140.159 120.521 140.564 119.915C140.937 119.37 141.17 118.733 141.326 117.971C141.481 117.225 141.543 116.385 141.59 115.514C141.652 114.535 141.699 113.555 141.761 112.56C140.704 112.342 139.615 112.218 138.48 112.156C126.461 111.518 114.674 115.608 102.717 116.292V116.323Z" fill="#F89A44"/>
<path d="M138.853 31.8602C138.605 29.8388 138.294 27.8485 137.547 26.2159C137.33 25.7494 137.081 25.314 136.785 24.8942C136.241 24.1323 135.573 23.5104 134.795 22.9817C134.018 22.453 133.131 22.0332 132.167 21.7067C130.239 21.0225 128.016 20.6804 125.87 20.4316C116.152 19.2966 106.371 18.8301 96.56 18.8301C81.1819 18.8301 65.7573 19.9963 50.4881 21.6289C48.0313 24.0079 45.9166 26.6979 44.5017 29.7611C40.5211 38.3753 38.5308 47.9535 38.3909 57.4229C38.1266 75.04 44.766 93.8855 58.8224 105.174C71.1839 115.11 87.3394 117.178 102.717 116.307C114.675 115.623 126.461 111.534 138.48 112.171C139.615 112.233 140.704 112.373 141.761 112.575C142.197 104.505 142.43 96.4044 142.43 88.3189C142.43 69.4423 141.232 50.5657 138.853 31.8447V31.8602Z" fill="#ECBB2F"/>
<path d="M118.717 35.5144C102.749 22.3287 82.5503 20.4318 73.6096 31.2695C72.6455 32.4356 71.8681 33.7107 71.2461 35.0479C71.4327 34.8924 71.6193 34.7369 71.8059 34.597C73.6251 33.1975 75.6154 32.0936 77.699 31.285C80.4822 30.2121 83.4521 29.6524 86.422 29.6524C87.1217 29.6524 87.8214 29.699 88.5211 29.7612C96.9332 28.9837 105.159 32.7155 109.994 39.8681C116.96 50.1771 112.404 62.2432 104.785 69.629C101.38 72.941 97.524 75.5999 94.1343 77.699V80.1247C108.393 88.2102 123.911 88.1169 131.452 78.9896C140.393 68.1519 134.686 48.6844 118.717 35.4988V35.5144Z" fill="#FAD846"/>
<path d="M93.1236 62.0874C94.3364 60.9056 95.4404 59.5529 96.3267 58.1379C97.213 56.7229 97.866 55.2458 98.2392 53.8153C98.488 52.8668 98.6124 51.9338 98.6124 51.0475C98.6124 50.1457 98.488 49.2905 98.2237 48.4197C97.9593 47.549 97.5551 46.6782 96.9486 45.7764C95.627 43.8172 94.0099 42.4644 92.2217 41.5626C91.0711 40.9873 89.8427 40.583 88.5832 40.3809C87.9302 40.4897 87.3082 40.6296 86.7329 40.8007C80.9175 42.5888 77.4501 47.5645 77.4501 54.1418C77.4501 56.583 75.7864 58.6355 73.5317 59.2263C75.5376 63.0825 78.2587 66.8609 81.6173 70.3595C81.7106 70.2973 81.7883 70.2351 81.8816 70.1729C86.0798 67.7161 89.9827 65.1194 93.1236 62.0718V62.0874Z" fill="#FAD846"/>
<path d="M104.785 69.6449C112.404 62.259 116.976 50.1774 109.994 39.8839C105.158 32.7313 96.933 28.9996 88.5209 29.777C91.413 30.0258 94.2896 30.8188 96.9952 32.1716C100.338 33.8664 103.37 36.4631 105.672 39.8839C106.853 41.641 107.74 43.4913 108.315 45.3727C108.89 47.2542 109.155 49.1823 109.155 51.0482C109.155 52.9141 108.89 54.7333 108.439 56.4748C107.988 58.2163 107.335 59.8645 106.558 61.4349C104.987 64.5603 102.873 67.3125 100.463 69.6449C97.1351 72.8635 93.4811 75.4447 89.8115 77.6993V90.6206C89.8115 92.7508 88.5365 94.5856 86.7017 95.4252C87.3703 95.7207 88.0855 95.8917 88.863 95.8917C91.7707 95.8917 94.1341 93.5282 94.1341 90.6206V77.6993C97.5238 75.6002 101.38 72.9413 104.785 69.6293V69.6449Z" fill="#F89A44"/>
<path d="M88.9562 98.3477C88.1943 98.3477 87.4635 98.4876 86.7949 98.7364C89.205 99.6227 90.931 101.924 90.931 104.645C90.931 107.366 89.205 109.667 86.7949 110.554C87.4635 110.802 88.1943 110.942 88.9562 110.942C92.4392 110.942 95.2536 108.128 95.2536 104.645C95.2536 101.162 92.4392 98.3477 88.9562 98.3477Z" fill="#F89A44"/>
<path d="M90.9312 104.645C90.9312 101.924 89.2052 99.6227 86.7951 98.7364C86.1265 98.4876 85.3957 98.3477 84.6338 98.3477C81.1508 98.3477 78.3364 101.162 78.3364 104.645C78.3364 108.128 81.1508 110.942 84.6338 110.942C85.3957 110.942 86.1265 110.802 86.7951 110.554C89.2052 109.667 90.9312 107.366 90.9312 104.645Z" fill="white"/>
<path d="M148.198 110.057C147.809 109.855 147.483 110.057 147.623 110.508C148.571 113.633 148.291 117.023 146.939 119.993C145.648 122.838 143.316 125.124 140.517 126.492C138.946 127.27 137.236 127.705 135.51 127.83C135.012 127.861 135.401 128.685 135.51 128.871C135.728 129.244 136.21 129.835 136.707 129.789C139.91 129.555 143.02 128.203 145.368 126.041C147.872 123.74 149.364 120.599 149.769 117.241C150.002 115.266 149.815 113.26 149.24 111.363C149.084 110.834 148.696 110.306 148.198 110.041V110.057Z" fill="#0C1D3E"/>
<path d="M26.9622 38.5767C27.211 38.7633 27.8018 39.0121 27.7863 38.4679C27.6774 34.4718 27.7396 30.1491 29.5122 26.4795C31.036 23.3075 34.2236 21.2239 37.3801 19.9023C39.3081 19.1093 41.3917 18.5962 43.4908 18.5806C43.9884 18.5806 43.5841 17.7099 43.4908 17.5388C43.2576 17.1501 42.8067 16.6059 42.2936 16.6214C38.5462 16.6525 34.7056 18.2074 31.7046 20.4154C30.3208 21.4416 29.0924 22.67 28.2372 24.1783C27.2732 25.8887 26.7445 27.8323 26.4646 29.7604C26.0914 32.2171 26.0448 34.705 26.107 37.1928C26.107 37.7215 26.5579 38.2813 26.9622 38.5923V38.5767Z" fill="#0C1D3E"/>
<path d="M55.9145 133.319C56.2876 133.303 56.3965 133.085 56.1321 132.806C55.8523 132.51 55.2614 132.23 54.8416 132.246C51.6385 132.401 48.4198 132.448 45.2011 132.324C42.3246 132.215 39.2925 132.059 36.5248 131.313C36.276 131.251 36.0116 131.173 35.7629 131.095C35.7318 131.095 35.5296 131.017 35.4985 131.002C35.3741 130.955 35.2653 130.909 35.1564 130.862C35.0787 130.831 35.0165 130.8 34.9387 130.769C34.9232 130.769 34.7833 130.691 34.7366 130.66C34.6744 130.629 34.6433 130.613 34.6433 130.613C34.6433 130.613 34.6122 130.598 34.5656 130.551C34.4101 130.427 34.2546 130.318 34.0991 130.178C32.9018 129.089 32.2021 127.519 31.7356 125.995C31.2225 124.3 30.9426 122.528 30.6317 120.786C30.2896 118.967 29.9786 117.132 29.6987 115.313C28.9835 110.788 28.4392 106.232 28.0505 101.661C28.0039 101.101 26.1691 100.51 26.2157 101.101C26.5733 105.377 27.0865 109.637 27.724 113.867C28.0194 115.795 28.3459 117.723 28.688 119.636C29.0301 121.486 29.31 123.383 29.8387 125.202C30.3051 126.819 31.0048 128.405 32.1399 129.68C33.104 130.753 34.3168 131.437 35.6696 131.919C38.4373 132.899 41.516 133.148 44.4237 133.319C48.2488 133.552 52.0894 133.521 55.9145 133.334V133.319Z" fill="#0C1D3E"/>
<path d="M77.45 54.1428C77.45 47.5656 80.9175 42.5743 86.7328 40.8017C87.3237 40.6307 87.9457 40.4752 88.5832 40.3819C87.8679 40.2575 87.1527 40.1953 86.4219 40.1953C84.5404 40.1953 82.6434 40.5996 80.9019 41.3615C79.176 42.1234 77.6211 43.2429 76.3772 44.689C75.5375 45.653 74.8378 46.757 74.2936 48.032C73.5783 49.7269 73.1274 51.7483 73.1274 54.1584C73.1274 56.2886 71.8524 58.1234 70.0176 58.963C70.6706 59.2585 71.4014 59.4295 72.1789 59.4295C72.6454 59.4295 73.0963 59.3673 73.5161 59.2429C75.7707 58.6521 77.4345 56.5996 77.4345 54.1584L77.45 54.1428Z" fill="#F89A44"/>
<path d="M89.8115 90.6203V77.6991C93.4811 75.4289 97.1351 72.8478 100.463 69.6446C102.857 67.3123 104.972 64.5601 106.558 61.4347C107.335 59.8798 107.988 58.2161 108.439 56.4746C108.89 54.7331 109.155 52.9138 109.155 51.048C109.155 49.1821 108.89 47.2695 108.315 45.3725C107.74 43.4911 106.869 41.6252 105.672 39.8837C103.355 36.4629 100.323 33.8662 96.9951 32.1714C94.3052 30.8031 91.4286 30.0256 88.5209 29.7768C87.8212 29.7146 87.1215 29.668 86.4218 29.668C83.4364 29.668 80.482 30.2122 77.6987 31.3006C75.6152 32.1092 73.6249 33.2132 71.8056 34.6126C71.6191 34.7525 71.4325 34.9236 71.2459 35.0635C68.758 37.1004 66.6433 39.6816 65.1351 42.7758C63.5024 46.0878 62.6006 49.9595 62.6006 54.1578C62.6006 57.0654 64.9641 59.4289 67.8717 59.4289C68.6492 59.4289 69.38 59.2579 70.033 58.9624C71.8678 58.1383 73.1429 56.3035 73.1429 54.1578C73.1429 51.7477 73.5938 49.7418 74.309 48.0314C74.8533 46.7564 75.553 45.6524 76.3926 44.6884C77.6365 43.2423 79.1915 42.1383 80.9174 41.3609C82.6434 40.599 84.5403 40.1947 86.4373 40.1947C87.1681 40.1947 87.8989 40.2569 88.5986 40.3813C89.8581 40.5834 91.102 40.9877 92.2371 41.563C94.0253 42.4804 95.6424 43.8332 96.9641 45.7768C97.5705 46.6787 97.9747 47.5494 98.2391 48.4202C98.5034 49.2909 98.6278 50.1461 98.6278 51.048C98.6278 51.9342 98.5034 52.8672 98.2546 53.8157C97.8814 55.2462 97.2284 56.7234 96.3421 58.1383C95.4558 59.5533 94.3518 60.9061 93.139 62.0878C89.9981 65.1354 86.0952 67.7321 81.897 70.1889C81.8037 70.2511 81.7104 70.3133 81.6327 70.3755C80.1866 71.355 79.3003 72.9877 79.3003 74.7447V90.6359C79.3003 93.5436 81.6638 95.907 84.5714 95.907C85.3489 95.907 86.0797 95.736 86.7328 95.4406C88.5675 94.6165 89.8426 92.7817 89.8426 90.6359L89.8115 90.6203Z" fill="white"/>
</svg>);

export default TriviaIcon;
