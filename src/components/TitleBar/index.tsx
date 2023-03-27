import * as React from 'react';
import logo from '../../assets/logo.svg';
import pace from '../../assets/pace.svg';
import backArrow from '../../assets/arrow_back.svg';
import { useNavigate } from 'react-router-dom';

type TitleBarProps = {
  home?: boolean;
  back?: Function;
  showPendingTransaction?: () => void;
};

const TitleBar: React.FC<TitleBarProps> = ({ home, back, showPendingTransaction }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (back) {
      return back();
    }

    navigate(-1);
  };

  return (
    <div className="title-bar bg-main flex items-center px-4">
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-6 flex items-center">
          {home && <img src={logo} alt="Maximise logo" className="mt-2" />}
          {!home && <img onClick={goBack} src={backArrow} alt="back arrow" className="cursor-pointer" />}
        </div>
        <div className="col-span-6 flex items-center justify-end">
          {home && showPendingTransaction && (
            <div onClick={showPendingTransaction} className="cursor-pointer pr-1">
              <img src={pace} alt="pending transaction" className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
