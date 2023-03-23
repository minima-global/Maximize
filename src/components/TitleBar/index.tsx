import * as React from 'react';
import logo from '../../assets/logo.svg';
import pace from '../../assets/pace.svg';
import backArrow from '../../assets/arrow_back.svg';
import { Link, useNavigate } from "react-router-dom";

type TitleBarProps = {
  home?: boolean;
}

const TitleBar: React.FC<TitleBarProps> = ({ home }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="title-bar bg-main flex items-center px-4">
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-6 flex items-center">
          {home && (
            <img src={logo} alt="Maximise logo" className="mt-2" />
          )}
          {!home && (
            <img onClick={goBack} src={backArrow} alt="back arrow" className="cursor-pointer"  />
          )}
        </div>
        <div className="col-span-6 flex items-center justify-end">
          {home && (
            <Link to="/pending-transactions" className="pr-1">
              <img src={pace} alt="pending transaction" className="cursor-pointer" />
            </Link>
          )}
          {/*<img src={kebab} alt="menu" className="cursor-pointer" />*/}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
