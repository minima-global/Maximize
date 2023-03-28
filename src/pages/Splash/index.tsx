import * as React from 'react';
import { useContext } from 'react';
import { appContext } from '../../AppContext';

const Splash = () => {
  const { showOnboarding, dismissOnboarding } = useContext(appContext);
  const [step, setStep] = React.useState(1);
  const [displaySplash, setDisplaySplash] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplaySplash(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const goToDashboard = () => {
    dismissOnboarding();
  };

  if (!showOnboarding) {
    return <div />;
  }

  return (
    <div className="bg-black absolute h-full w-full z-20">
      {displaySplash && (
        <div className="disappear bg-main flex justify-center items-center h-full w-full absolute z-10">
          <div className="mb-28">
            <svg width="140" height="134" viewBox="0 0 140 134" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M79.4571 0.675781L0 133.106H39.7286L79.4571 66.8909V0.675781Z" fill="#08090B" />
              <path d="M87.027 88.9635L60.543 133.106H87.027H140V0.675781L87.027 88.9635Z" fill="#08090B" />
            </svg>
            <div className="absolute left-0 right-0 text-center bottom-20">
              <svg className="mb-7 mx-auto" width="156" height="26" viewBox="0 0 156 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 25.6758V2.98254H4.52079L12.9354 16.4364L9.96554 16.404L18.4792 2.98254H22.802V25.6758H17.9512V17.8953C17.9512 15.9501 17.9952 14.1995 18.0832 12.6434C18.1932 11.0873 18.3692 9.54198 18.6111 8.00748L19.2051 9.53117L12.4404 19.8404H10.2625L3.62983 9.59601L4.19081 8.00748C4.4328 9.45553 4.59779 10.9468 4.68579 12.4813C4.79578 13.9942 4.85078 15.7988 4.85078 17.8953V25.6758H0Z"
                  fill="black"
                />
                <path
                  d="M35.0129 26C33.561 26 32.2521 25.611 31.0861 24.8329C29.9202 24.0549 28.9962 22.9958 28.3142 21.6559C27.6323 20.3159 27.2913 18.7814 27.2913 17.0524C27.2913 15.3234 27.6323 13.7997 28.3142 12.4813C29.0182 11.1413 29.9642 10.0931 31.1521 9.33666C32.3401 8.5586 33.693 8.16958 35.2109 8.16958C36.0689 8.16958 36.8499 8.29925 37.5538 8.5586C38.2798 8.79634 38.9068 9.13134 39.4347 9.56359C39.9847 9.99584 40.4467 10.4929 40.8207 11.0549C41.1947 11.6168 41.4586 12.2219 41.6126 12.8703L40.6227 12.7082V8.52618H45.2755V25.6758H40.5567V21.5586L41.6126 21.4613C41.4366 22.0665 41.1507 22.6392 40.7547 23.1796C40.3587 23.7199 39.8637 24.2062 39.2697 24.6384C38.6978 25.049 38.0488 25.384 37.3228 25.6434C36.5969 25.8811 35.8269 26 35.0129 26ZM36.2999 22.0125C37.1798 22.0125 37.9498 21.8071 38.6098 21.3965C39.2697 20.9859 39.7757 20.4131 40.1277 19.6783C40.5017 18.9219 40.6887 18.0465 40.6887 17.0524C40.6887 16.0798 40.5017 15.2261 40.1277 14.4913C39.7757 13.7564 39.2697 13.1837 38.6098 12.7731C37.9498 12.3408 37.1798 12.1247 36.2999 12.1247C35.4419 12.1247 34.683 12.3408 34.023 12.7731C33.385 13.1837 32.879 13.7564 32.5051 14.4913C32.1311 15.2261 31.9441 16.0798 31.9441 17.0524C31.9441 18.0465 32.1311 18.9219 32.5051 19.6783C32.879 20.4131 33.385 20.9859 34.023 21.3965C34.683 21.8071 35.4419 22.0125 36.2999 22.0125Z"
                  fill="black"
                />
                <path
                  d="M61.3248 25.6758L57.002 19.6135L55.6821 17.798L48.6204 8.52618H54.2962L58.52 14.394L59.9719 16.3392L66.9346 25.6758H61.3248ZM48.5544 25.6758L55.5171 16.3067L58.091 19.3217L54.0652 25.6758H48.5544ZM59.7739 17.9601L57.266 14.9451L60.9949 8.52618H66.5056L59.7739 17.9601Z"
                  fill="black"
                />
                <path
                  d="M70.5577 25.6758V8.52618H75.2435V25.6758H70.5577ZM72.8676 4.99252C71.9657 4.99252 71.2617 4.77639 70.7557 4.34414C70.2497 3.91189 69.9967 3.29593 69.9967 2.49626C69.9967 1.76143 70.2497 1.16708 70.7557 0.713217C71.2837 0.237739 71.9877 0 72.8676 0C73.7696 0 74.4735 0.226933 74.9795 0.680799C75.4855 1.11305 75.7385 1.7182 75.7385 2.49626C75.7385 3.2527 75.4745 3.85786 74.9465 4.31172C74.4405 4.76559 73.7476 4.99252 72.8676 4.99252Z"
                  fill="black"
                />
                <path
                  d="M80.5452 25.6758V8.52618H85.066L85.165 11.8005L84.472 11.9302C84.714 11.3682 85.033 10.8603 85.4289 10.4065C85.8249 9.95262 86.2869 9.56359 86.8149 9.2394C87.3649 8.91521 87.9368 8.66667 88.5308 8.49377C89.1248 8.29925 89.7188 8.20199 90.3127 8.20199C91.2147 8.20199 92.0286 8.34248 92.7546 8.62344C93.4806 8.90441 94.0966 9.34747 94.6025 9.95262C95.1085 10.5362 95.5045 11.3142 95.7905 12.2868L95.0645 12.2219L95.2955 11.7032C95.5815 11.1845 95.9445 10.7199 96.3844 10.3092C96.8244 9.87697 97.3194 9.50956 97.8694 9.20698C98.4194 8.88279 98.9913 8.63425 99.5853 8.46135C100.179 8.28845 100.762 8.20199 101.334 8.20199C102.698 8.20199 103.831 8.47215 104.733 9.01247C105.635 9.53117 106.306 10.32 106.746 11.3791C107.208 12.4381 107.439 13.7348 107.439 15.2693V25.6758H102.753V15.5935C102.753 14.8155 102.643 14.1779 102.423 13.6808C102.203 13.1837 101.884 12.8163 101.466 12.5786C101.048 12.3192 100.509 12.1895 99.8493 12.1895C99.3433 12.1895 98.8703 12.276 98.4304 12.4489C98.0124 12.6002 97.6384 12.8271 97.3084 13.1297C97.0004 13.4106 96.7584 13.7456 96.5824 14.1347C96.4064 14.5237 96.3185 14.9559 96.3185 15.4314V25.6758H91.6327V15.5611C91.6327 14.8479 91.5117 14.2427 91.2697 13.7456C91.0497 13.2269 90.7307 12.8379 90.3127 12.5786C89.8947 12.3192 89.3778 12.1895 88.7618 12.1895C88.2558 12.1895 87.7828 12.276 87.3429 12.4489C86.9249 12.6002 86.5619 12.8271 86.2539 13.1297C85.9459 13.4106 85.6929 13.7456 85.4949 14.1347C85.319 14.5237 85.231 14.9451 85.231 15.399V25.6758H80.5452Z"
                  fill="black"
                />
                <path
                  d="M112.627 25.6758V8.52618H117.313V25.6758H112.627ZM114.937 4.99252C114.035 4.99252 113.331 4.77639 112.825 4.34414C112.319 3.91189 112.066 3.29593 112.066 2.49626C112.066 1.76143 112.319 1.16708 112.825 0.713217C113.353 0.237739 114.057 0 114.937 0C115.839 0 116.543 0.226933 117.049 0.680799C117.555 1.11305 117.808 1.7182 117.808 2.49626C117.808 3.2527 117.544 3.85786 117.016 4.31172C116.51 4.76559 115.817 4.99252 114.937 4.99252Z"
                  fill="black"
                />
                <path d="M121.954 25.6758V22.7581L131.161 11.0224V12.3192H121.954V8.52618H135.88V11.5087L127.069 22.9526L126.937 21.8828H136.111V25.6758H121.954Z" fill="black" />
                <path
                  d="M148.404 26C146.512 26 144.862 25.6218 143.454 24.8653C142.046 24.1089 140.946 23.0715 140.154 21.7531C139.362 20.4347 138.966 18.9219 138.966 17.2145C138.966 15.8961 139.186 14.6858 139.626 13.5835C140.066 12.4813 140.682 11.5303 141.474 10.7307C142.266 9.90939 143.201 9.28263 144.279 8.85037C145.379 8.39651 146.567 8.16958 147.843 8.16958C149.031 8.16958 150.131 8.3857 151.143 8.81796C152.155 9.22859 153.024 9.82294 153.749 10.601C154.497 11.3574 155.069 12.2544 155.465 13.2918C155.861 14.3292 156.037 15.4638 155.993 16.6958L155.96 18.1222H141.936L141.177 15.3017H152.1L151.572 15.8853V15.1721C151.528 14.5885 151.33 14.059 150.978 13.5835C150.648 13.1081 150.219 12.7406 149.691 12.4813C149.163 12.2219 148.569 12.0923 147.909 12.0923C146.941 12.0923 146.116 12.276 145.434 12.6434C144.774 13.0108 144.268 13.5511 143.916 14.2643C143.564 14.9776 143.388 15.8421 143.388 16.8579C143.388 17.8953 143.608 18.7922 144.048 19.5486C144.51 20.3051 145.148 20.8994 145.962 21.3317C146.798 21.7423 147.777 21.9476 148.899 21.9476C149.669 21.9476 150.373 21.8288 151.011 21.591C151.649 21.3533 152.331 20.9426 153.057 20.3591L155.3 23.4389C154.662 24.0008 153.958 24.4763 153.189 24.8653C152.419 25.2328 151.627 25.5137 150.813 25.7082C149.999 25.9027 149.196 26 148.404 26Z"
                  fill="black"
                />
              </svg>
              <svg className="mx-auto" width="190" height="16" viewBox="0 0 190 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.931874 12.1016V0.581562H5.58787C5.69987 0.581562 5.83854 0.586895 6.00387 0.597562C6.16921 0.602895 6.32654 0.618896 6.47587 0.645562C7.11587 0.746895 7.64921 0.965562 8.07587 1.30156C8.50787 1.63756 8.83054 2.06156 9.04387 2.57356C9.25721 3.08556 9.36387 3.6509 9.36387 4.26956C9.36387 4.89356 9.25721 5.46156 9.04387 5.97356C8.83054 6.48556 8.50787 6.90956 8.07587 7.24556C7.64921 7.58156 7.11587 7.80023 6.47587 7.90156C6.32654 7.9229 6.16654 7.9389 5.99587 7.94956C5.83054 7.96023 5.69454 7.96556 5.58787 7.96556H2.60387V12.1016H0.931874ZM2.60387 6.38156H5.52387C5.63054 6.38156 5.74787 6.37623 5.87587 6.36556C6.00921 6.3549 6.13454 6.33623 6.25187 6.30956C6.59321 6.22956 6.86787 6.0829 7.07587 5.86956C7.28387 5.6509 7.43321 5.40023 7.52387 5.11756C7.61454 4.8349 7.65987 4.55223 7.65987 4.26956C7.65987 3.9869 7.61454 3.7069 7.52387 3.42956C7.43321 3.1469 7.28387 2.8989 7.07587 2.68556C6.86787 2.4669 6.59321 2.31756 6.25187 2.23756C6.13454 2.20556 6.00921 2.18423 5.87587 2.17356C5.74787 2.1629 5.63054 2.15756 5.52387 2.15756H2.60387V6.38156ZM14.9257 12.3416C14.0617 12.3416 13.3124 12.1469 12.6777 11.7576C12.0431 11.3682 11.5524 10.8322 11.2057 10.1496C10.8644 9.46156 10.6937 8.66956 10.6937 7.77356C10.6937 6.87223 10.8697 6.08023 11.2217 5.39756C11.5737 4.70956 12.0671 4.17623 12.7017 3.79756C13.3364 3.41356 14.0777 3.22156 14.9257 3.22156C15.7897 3.22156 16.5391 3.41623 17.1737 3.80556C17.8084 4.1949 18.2991 4.7309 18.6457 5.41356C18.9924 6.09623 19.1657 6.8829 19.1657 7.77356C19.1657 8.6749 18.9897 9.46956 18.6377 10.1576C18.2911 10.8402 17.8004 11.3762 17.1657 11.7656C16.5311 12.1496 15.7844 12.3416 14.9257 12.3416ZM14.9257 10.7656C15.7524 10.7656 16.3684 10.4882 16.7737 9.93356C17.1844 9.37356 17.3897 8.65356 17.3897 7.77356C17.3897 6.87223 17.1817 6.15223 16.7657 5.61356C16.3551 5.06956 15.7417 4.79756 14.9257 4.79756C14.3657 4.79756 13.9044 4.92556 13.5417 5.18156C13.1791 5.43223 12.9097 5.78156 12.7337 6.22956C12.5577 6.67223 12.4697 7.1869 12.4697 7.77356C12.4697 8.68023 12.6777 9.40556 13.0937 9.94956C13.5097 10.4936 14.1204 10.7656 14.9257 10.7656ZM22.7712 12.1016L20.1312 3.45356L21.7872 3.46156L23.5952 9.38956L25.4192 3.46156H26.8592L28.6832 9.38956L30.4912 3.46156H32.1392L29.4992 12.1016H28.1552L26.1392 5.84556L24.1152 12.1016H22.7712ZM37.4114 12.3416C36.5527 12.3416 35.798 12.1549 35.1474 11.7816C34.502 11.4029 33.998 10.8776 33.6354 10.2056C33.278 9.52823 33.0994 8.74423 33.0994 7.85356C33.0994 6.90956 33.2754 6.0909 33.6274 5.39756C33.9847 4.70423 34.4807 4.16823 35.1154 3.78956C35.75 3.4109 36.4887 3.22156 37.3314 3.22156C38.2114 3.22156 38.9607 3.4269 39.5794 3.83756C40.198 4.2429 40.6594 4.82156 40.9634 5.57356C41.2727 6.32556 41.3954 7.2189 41.3314 8.25356H39.6594V7.64556C39.6487 6.6429 39.4567 5.90156 39.0834 5.42156C38.7154 4.94156 38.1527 4.70156 37.3954 4.70156C36.558 4.70156 35.9287 4.96556 35.5074 5.49356C35.086 6.02156 34.8754 6.78423 34.8754 7.78156C34.8754 8.7309 35.086 9.4669 35.5074 9.98956C35.9287 10.5069 36.5367 10.7656 37.3314 10.7656C37.854 10.7656 38.3047 10.6482 38.6834 10.4136C39.0674 10.1736 39.366 9.83223 39.5794 9.38956L41.2194 9.90956C40.8834 10.6829 40.374 11.2829 39.6914 11.7096C39.0087 12.1309 38.2487 12.3416 37.4114 12.3416ZM34.3314 8.25356V6.94956H40.4994V8.25356H34.3314ZM43.4462 12.1016V3.46156H44.9342V5.55756L44.7262 5.28556C44.8329 5.00823 44.9716 4.7549 45.1422 4.52556C45.3129 4.2909 45.5102 4.0989 45.7342 3.94956C45.9529 3.78956 46.1956 3.6669 46.4622 3.58156C46.7342 3.4909 47.0116 3.43756 47.2942 3.42156C47.5769 3.40023 47.8489 3.41356 48.1102 3.46156V5.02956C47.8276 4.9549 47.5129 4.93356 47.1662 4.96556C46.8249 4.99756 46.5102 5.1069 46.2222 5.29356C45.9502 5.46956 45.7342 5.6829 45.5742 5.93356C45.4196 6.18423 45.3076 6.46423 45.2382 6.77356C45.1689 7.07756 45.1342 7.40023 45.1342 7.74156V12.1016H43.4462ZM53.6295 12.3416C52.7708 12.3416 52.0162 12.1549 51.3655 11.7816C50.7202 11.4029 50.2162 10.8776 49.8535 10.2056C49.4962 9.52823 49.3175 8.74423 49.3175 7.85356C49.3175 6.90956 49.4935 6.0909 49.8455 5.39756C50.2028 4.70423 50.6988 4.16823 51.3335 3.78956C51.9682 3.4109 52.7068 3.22156 53.5495 3.22156C54.4295 3.22156 55.1788 3.4269 55.7975 3.83756C56.4162 4.2429 56.8775 4.82156 57.1815 5.57356C57.4908 6.32556 57.6135 7.2189 57.5495 8.25356H55.8775V7.64556C55.8668 6.6429 55.6748 5.90156 55.3015 5.42156C54.9335 4.94156 54.3708 4.70156 53.6135 4.70156C52.7762 4.70156 52.1468 4.96556 51.7255 5.49356C51.3042 6.02156 51.0935 6.78423 51.0935 7.78156C51.0935 8.7309 51.3042 9.4669 51.7255 9.98956C52.1468 10.5069 52.7548 10.7656 53.5495 10.7656C54.0722 10.7656 54.5228 10.6482 54.9015 10.4136C55.2855 10.1736 55.5842 9.83223 55.7975 9.38956L57.4375 9.90956C57.1015 10.6829 56.5922 11.2829 55.9095 11.7096C55.2268 12.1309 54.4668 12.3416 53.6295 12.3416ZM50.5495 8.25356V6.94956H56.7175V8.25356H50.5495ZM63.0964 12.3416C62.291 12.3416 61.595 12.1416 61.0084 11.7416C60.427 11.3416 59.9764 10.7976 59.6564 10.1096C59.3417 9.41623 59.1844 8.63756 59.1844 7.77356C59.1844 6.90423 59.3444 6.12823 59.6644 5.44556C59.9844 4.75756 60.4377 4.21623 61.0244 3.82156C61.6164 3.42156 62.3177 3.22156 63.1284 3.22156C63.9444 3.22156 64.6297 3.42156 65.1844 3.82156C65.7444 4.21623 66.1657 4.75756 66.4484 5.44556C66.7364 6.13356 66.8804 6.90956 66.8804 7.77356C66.8804 8.63756 66.7364 9.41356 66.4484 10.1016C66.1604 10.7896 65.7364 11.3362 65.1764 11.7416C64.6164 12.1416 63.923 12.3416 63.0964 12.3416ZM63.3284 10.8296C63.8777 10.8296 64.3257 10.6989 64.6724 10.4376C65.019 10.1762 65.2724 9.81623 65.4324 9.35756C65.5924 8.8989 65.6724 8.3709 65.6724 7.77356C65.6724 7.17623 65.5897 6.64823 65.4244 6.18956C65.2644 5.7309 65.0137 5.37356 64.6724 5.11756C64.3364 4.86156 63.907 4.73356 63.3844 4.73356C62.8297 4.73356 62.3737 4.86956 62.0164 5.14156C61.659 5.41356 61.3924 5.7789 61.2164 6.23756C61.0457 6.69623 60.9604 7.20823 60.9604 7.77356C60.9604 8.34423 61.0457 8.86156 61.2164 9.32556C61.3924 9.78423 61.6537 10.1496 62.0004 10.4216C62.3524 10.6936 62.795 10.8296 63.3284 10.8296ZM65.6724 12.1016V5.88556H65.4804V0.581562H67.1604V12.1016H65.6724ZM77.2979 12.3416C76.4712 12.3416 75.7779 12.1416 75.2179 11.7416C74.6579 11.3362 74.2339 10.7896 73.9459 10.1016C73.6579 9.41356 73.5139 8.63756 73.5139 7.77356C73.5139 6.90956 73.6552 6.13356 73.9379 5.44556C74.2259 4.75756 74.6472 4.21623 75.2019 3.82156C75.7619 3.42156 76.4499 3.22156 77.2659 3.22156C78.0765 3.22156 78.7752 3.42156 79.3619 3.82156C79.9539 4.21623 80.4099 4.75756 80.7299 5.44556C81.0499 6.12823 81.2099 6.90423 81.2099 7.77356C81.2099 8.63756 81.0499 9.41623 80.7299 10.1096C80.4152 10.7976 79.9645 11.3416 79.3779 11.7416C78.7965 12.1416 78.1032 12.3416 77.2979 12.3416ZM73.2339 12.1016V0.581562H74.9139V5.88556H74.7219V12.1016H73.2339ZM77.0659 10.8296C77.5992 10.8296 78.0392 10.6936 78.3859 10.4216C78.7379 10.1496 78.9992 9.78423 79.1699 9.32556C79.3459 8.86156 79.4339 8.34423 79.4339 7.77356C79.4339 7.20823 79.3459 6.69623 79.1699 6.23756C78.9992 5.7789 78.7352 5.41356 78.3779 5.14156C78.0205 4.86956 77.5645 4.73356 77.0099 4.73356C76.4872 4.73356 76.0552 4.86156 75.7139 5.11756C75.3779 5.37356 75.1272 5.7309 74.9619 6.18956C74.8019 6.64823 74.7219 7.17623 74.7219 7.77356C74.7219 8.3709 74.8019 8.8989 74.9619 9.35756C75.1219 9.81623 75.3752 10.1762 75.7219 10.4376C76.0685 10.6989 76.5165 10.8296 77.0659 10.8296ZM83.933 15.9416L85.605 11.3896L85.629 12.7336L81.861 3.46156H83.605L86.421 10.6216H85.909L88.597 3.46156H90.293L85.525 15.9416H83.933ZM95.3894 12.1016V0.581562H102.213V2.25356H97.0614V5.50156H101.253V7.18156H97.0614V12.1016H95.3894ZM107.231 12.3336C106.634 12.3336 106.132 12.2376 105.727 12.0456C105.322 11.8536 104.991 11.6029 104.735 11.2936C104.484 10.9789 104.292 10.6376 104.159 10.2696C104.026 9.90156 103.935 9.54156 103.887 9.18956C103.839 8.83756 103.815 8.52823 103.815 8.26156V3.46156H105.511V7.70956C105.511 8.04556 105.538 8.39223 105.591 8.74956C105.65 9.10156 105.756 9.42956 105.911 9.73356C106.071 10.0376 106.292 10.2829 106.575 10.4696C106.863 10.6562 107.236 10.7496 107.695 10.7496C107.994 10.7496 108.276 10.7016 108.543 10.6056C108.81 10.5042 109.042 10.3442 109.239 10.1256C109.442 9.9069 109.599 9.6189 109.711 9.26156C109.828 8.90423 109.887 8.46956 109.887 7.95756L110.927 8.34956C110.927 9.13356 110.78 9.8269 110.487 10.4296C110.194 11.0269 109.772 11.4936 109.223 11.8296C108.674 12.1656 108.01 12.3336 107.231 12.3336ZM110.087 12.1016V9.60556H109.887V3.46156H111.575V12.1016H110.087ZM119.083 12.1016C118.539 12.2082 118.005 12.2536 117.483 12.2376C116.96 12.2216 116.493 12.1202 116.083 11.9336C115.672 11.7469 115.363 11.4536 115.155 11.0536C114.968 10.6962 114.867 10.3336 114.851 9.96556C114.84 9.59223 114.835 9.1709 114.835 8.70156V1.06156H116.515V8.62156C116.515 8.96823 116.517 9.26956 116.523 9.52556C116.533 9.78156 116.589 9.99756 116.691 10.1736C116.883 10.5042 117.187 10.6936 117.603 10.7416C118.024 10.7842 118.517 10.7656 119.083 10.6856V12.1016ZM113.179 4.80556V3.46156H119.083V4.80556H113.179ZM124.48 12.3336C123.883 12.3336 123.382 12.2376 122.976 12.0456C122.571 11.8536 122.24 11.6029 121.984 11.2936C121.734 10.9789 121.542 10.6376 121.408 10.2696C121.275 9.90156 121.184 9.54156 121.136 9.18956C121.088 8.83756 121.064 8.52823 121.064 8.26156V3.46156H122.76V7.70956C122.76 8.04556 122.787 8.39223 122.84 8.74956C122.899 9.10156 123.006 9.42956 123.16 9.73356C123.32 10.0376 123.542 10.2829 123.824 10.4696C124.112 10.6562 124.486 10.7496 124.944 10.7496C125.243 10.7496 125.526 10.7016 125.792 10.6056C126.059 10.5042 126.291 10.3442 126.488 10.1256C126.691 9.9069 126.848 9.6189 126.96 9.26156C127.078 8.90423 127.136 8.46956 127.136 7.95756L128.176 8.34956C128.176 9.13356 128.03 9.8269 127.736 10.4296C127.443 11.0269 127.022 11.4936 126.472 11.8296C125.923 12.1656 125.259 12.3336 124.48 12.3336ZM127.336 12.1016V9.60556H127.136V3.46156H128.824V12.1016H127.336ZM131.388 12.1016V3.46156H132.876V5.55756L132.668 5.28556C132.775 5.00823 132.913 4.7549 133.084 4.52556C133.255 4.2909 133.452 4.0989 133.676 3.94956C133.895 3.78956 134.137 3.6669 134.404 3.58156C134.676 3.4909 134.953 3.43756 135.236 3.42156C135.519 3.40023 135.791 3.41356 136.052 3.46156V5.02956C135.769 4.9549 135.455 4.93356 135.108 4.96556C134.767 4.99756 134.452 5.1069 134.164 5.29356C133.892 5.46956 133.676 5.6829 133.516 5.93356C133.361 6.18423 133.249 6.46423 133.18 6.77356C133.111 7.07756 133.076 7.40023 133.076 7.74156V12.1016H131.388ZM141.571 12.3416C140.713 12.3416 139.958 12.1549 139.307 11.7816C138.662 11.4029 138.158 10.8776 137.795 10.2056C137.438 9.52823 137.259 8.74423 137.259 7.85356C137.259 6.90956 137.435 6.0909 137.787 5.39756C138.145 4.70423 138.641 4.16823 139.275 3.78956C139.91 3.4109 140.649 3.22156 141.491 3.22156C142.371 3.22156 143.121 3.4269 143.739 3.83756C144.358 4.2429 144.819 4.82156 145.123 5.57356C145.433 6.32556 145.555 7.2189 145.491 8.25356H143.819V7.64556C143.809 6.6429 143.617 5.90156 143.243 5.42156C142.875 4.94156 142.313 4.70156 141.555 4.70156C140.718 4.70156 140.089 4.96556 139.667 5.49356C139.246 6.02156 139.035 6.78423 139.035 7.78156C139.035 8.7309 139.246 9.4669 139.667 9.98956C140.089 10.5069 140.697 10.7656 141.491 10.7656C142.014 10.7656 142.465 10.6482 142.843 10.4136C143.227 10.1736 143.526 9.83223 143.739 9.38956L145.379 9.90956C145.043 10.6829 144.534 11.2829 143.851 11.7096C143.169 12.1309 142.409 12.3416 141.571 12.3416ZM138.491 8.25356V6.94956H144.659V8.25356H138.491ZM155.937 12.3416C154.785 12.3416 153.804 12.0909 152.993 11.5896C152.183 11.0829 151.561 10.3789 151.129 9.47756C150.703 8.57623 150.489 7.5309 150.489 6.34156C150.489 5.15223 150.703 4.1069 151.129 3.20556C151.561 2.30423 152.183 1.6029 152.993 1.10156C153.804 0.594895 154.785 0.341562 155.937 0.341562C157.265 0.341562 158.364 0.677562 159.233 1.34956C160.108 2.02156 160.716 2.92556 161.057 4.06156L159.361 4.51756C159.137 3.71223 158.737 3.08023 158.161 2.62156C157.591 2.1629 156.849 1.93356 155.937 1.93356C155.121 1.93356 154.441 2.11756 153.897 2.48556C153.353 2.85356 152.943 3.36823 152.665 4.02956C152.393 4.6909 152.257 5.46156 152.257 6.34156C152.252 7.22156 152.385 7.99223 152.657 8.65356C152.935 9.3149 153.345 9.82956 153.889 10.1976C154.439 10.5656 155.121 10.7496 155.937 10.7496C156.849 10.7496 157.591 10.5202 158.161 10.0616C158.737 9.59756 159.137 8.96556 159.361 8.16556L161.057 8.62156C160.716 9.75756 160.108 10.6616 159.233 11.3336C158.364 12.0056 157.265 12.3416 155.937 12.3416ZM165.577 12.3416C164.937 12.3416 164.401 12.2242 163.969 11.9896C163.537 11.7496 163.209 11.4349 162.985 11.0456C162.766 10.6509 162.657 10.2189 162.657 9.74956C162.657 9.31223 162.734 8.92823 162.889 8.59756C163.044 8.2669 163.273 7.9869 163.577 7.75756C163.881 7.5229 164.254 7.33356 164.697 7.18956C165.081 7.07756 165.516 6.9789 166.001 6.89356C166.486 6.80823 166.996 6.72823 167.529 6.65356C168.068 6.5789 168.601 6.50423 169.129 6.42956L168.521 6.76556C168.532 6.08823 168.388 5.5869 168.089 5.26156C167.796 4.9309 167.289 4.76556 166.569 4.76556C166.116 4.76556 165.7 4.87223 165.321 5.08556C164.942 5.29356 164.678 5.64023 164.529 6.12556L162.969 5.64556C163.182 4.90423 163.588 4.3149 164.185 3.87756C164.788 3.44023 165.588 3.22156 166.585 3.22156C167.358 3.22156 168.03 3.3549 168.601 3.62156C169.177 3.8829 169.598 4.2989 169.865 4.86956C170.004 5.15223 170.089 5.4509 170.121 5.76556C170.153 6.08023 170.169 6.4189 170.169 6.78156V12.1016H168.689V10.1256L168.977 10.3816C168.62 11.0429 168.164 11.5362 167.609 11.8616C167.06 12.1816 166.382 12.3416 165.577 12.3416ZM165.873 10.9736C166.348 10.9736 166.756 10.8909 167.097 10.7256C167.438 10.5549 167.713 10.3389 167.921 10.0776C168.129 9.81623 168.265 9.54423 168.329 9.26156C168.42 9.00556 168.47 8.71756 168.481 8.39756C168.497 8.07756 168.505 7.82156 168.505 7.62956L169.049 7.82956C168.521 7.90956 168.041 7.98156 167.609 8.04556C167.177 8.10956 166.785 8.17356 166.433 8.23756C166.086 8.29623 165.777 8.36823 165.505 8.45356C165.276 8.53356 165.07 8.62956 164.889 8.74156C164.713 8.85356 164.572 8.98956 164.465 9.14956C164.364 9.30956 164.313 9.50423 164.313 9.73356C164.313 9.95756 164.369 10.1656 164.481 10.3576C164.593 10.5442 164.764 10.6936 164.993 10.8056C165.222 10.9176 165.516 10.9736 165.873 10.9736ZM175.87 12.3336C174.82 12.3336 173.964 12.1016 173.302 11.6376C172.641 11.1736 172.236 10.5202 172.086 9.67756L173.798 9.41356C173.905 9.86156 174.15 10.2162 174.534 10.4776C174.924 10.7336 175.406 10.8616 175.982 10.8616C176.505 10.8616 176.913 10.7549 177.206 10.5416C177.505 10.3282 177.654 10.0349 177.654 9.66156C177.654 9.4429 177.601 9.2669 177.494 9.13356C177.393 8.9949 177.177 8.86423 176.846 8.74156C176.516 8.6189 176.012 8.4669 175.334 8.28556C174.593 8.09356 174.004 7.88823 173.566 7.66956C173.134 7.44556 172.825 7.1869 172.638 6.89356C172.457 6.5949 172.366 6.2349 172.366 5.81356C172.366 5.2909 172.505 4.8349 172.782 4.44556C173.06 4.05623 173.449 3.7549 173.95 3.54156C174.457 3.32823 175.049 3.22156 175.726 3.22156C176.388 3.22156 176.977 3.32556 177.494 3.53356C178.012 3.74156 178.43 4.03756 178.75 4.42156C179.07 4.80023 179.262 5.24556 179.326 5.75756L177.614 6.06956C177.556 5.65356 177.361 5.32556 177.03 5.08556C176.7 4.84556 176.27 4.7149 175.742 4.69356C175.236 4.67223 174.825 4.75756 174.51 4.94956C174.196 5.13623 174.038 5.3949 174.038 5.72556C174.038 5.91756 174.097 6.08023 174.214 6.21356C174.337 6.3469 174.572 6.4749 174.918 6.59756C175.265 6.72023 175.777 6.8669 176.454 7.03756C177.18 7.22423 177.756 7.43223 178.182 7.66156C178.609 7.88556 178.913 8.1549 179.094 8.46956C179.281 8.7789 179.374 9.1549 179.374 9.59756C179.374 10.4509 179.062 11.1202 178.438 11.6056C177.82 12.0909 176.964 12.3336 175.87 12.3336ZM187.528 12.1016V7.85356C187.528 7.51756 187.499 7.17356 187.44 6.82156C187.387 6.46423 187.28 6.13356 187.12 5.82956C186.966 5.52556 186.744 5.28023 186.456 5.09356C186.174 4.9069 185.803 4.81356 185.344 4.81356C185.046 4.81356 184.763 4.86423 184.496 4.96556C184.23 5.06156 183.995 5.2189 183.792 5.43756C183.595 5.65623 183.438 5.94423 183.32 6.30156C183.208 6.6589 183.152 7.09356 183.152 7.60556L182.112 7.21356C182.112 6.42956 182.259 5.7389 182.552 5.14156C182.846 4.5389 183.267 4.06956 183.816 3.73356C184.366 3.39756 185.03 3.22956 185.808 3.22956C186.406 3.22956 186.907 3.32556 187.312 3.51756C187.718 3.70956 188.046 3.9629 188.296 4.27756C188.552 4.5869 188.747 4.92556 188.88 5.29356C189.014 5.66156 189.104 6.02156 189.152 6.37356C189.2 6.72556 189.224 7.0349 189.224 7.30156V12.1016H187.528ZM181.456 12.1016V0.581562H182.952V6.79756H183.152V12.1016H181.456Z"
                  fill="#08090B"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() => step === 5 ? goToDashboard() : setStep(prevState => prevState + 1)}
        className={`absolute cursor-pointer justify-center flex items-center h-full w-full text-center text-white`}
      >
        <div className={`absolute transition-opacity duration-200 ease-in-out ${step === 1 ? 'opacity-1' : 'opacity-0'}`}>
          <div className="text-primary text-2xl mb-16">Hello</div>
        </div>
        <div className={`absolute transition-opacity duration-200 ease-in-out ${step === 2 ? 'opacity-1' : 'opacity-0'}`}>
          <div className="text-primary text-2xl mb-16" style={{ lineHeight: '46px' }}>
            Lock up Native
            <span className="block lg:none" />
            Minima in your
            <span className="block lg:none" />
            self-custodial wallet
          </div>
        </div>
        <div className={`absolute transition-opacity duration-200 ease-in-out ${step === 3 ? 'opacity-1' : 'opacity-0'}`}>
          <div className="text-primary text-2xl mb-16" style={{ lineHeight: '46px' }}>
            Earn up to 18%
            <span className="block lg:none" />
            yield on your stake
            <span className="block lg:none" />
            from a guaranteed
            <span className="block lg:none" />
            fixed pool
          </div>
        </div>
        <div className={`absolute transition-opacity duration-200 ease-in-out ${step === 4 ? 'opacity-1' : 'opacity-0'}`}>
          <div className="text-primary text-2xl mb-16" style={{ lineHeight: '46px' }}>
            Choose your lock up
            <span className="block lg:none" />
            duration, and collect
            <span className="block lg:none" />
            your payment from
            <span className="block lg:none" />
            Future Cash.
          </div>
        </div>
        <div className={`absolute transition-opacity duration-200 ease-in-out ${step === 5 ? 'opacity-1' : 'opacity-0'}`}>
          <div className="text-primary text-2xl mb-16">Let’s go</div>
        </div>
        <div className="absolute bottom-20">Tap anywhere to continue</div>
      </div>
    </div>
  );
};

export default Splash;
