import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[200px] w-full bg-[#eeeeee] flex flex-col justify-center items-center">
      <p className="text-darkgray mb-3">Made by Team CloudNine</p>
      <div className="flex row">
        <div className="text-darkgray mr-3 flex flex-col">
          <Link to="https://github.com/ijooha16" target="_blank" >윤주하</Link>
          <Link to="https://github.com/noodlewd" target="_blank" >김동우</Link>
          <Link to="https://github.com/PureunKang" target="_blank" >강푸른</Link>
        </div>
        <div className="text-darkgray ml-3 flex flex-col">
          <Link to="https://github.com/Sumin-Lee12" target="_blank" >이수민</Link>
          <Link to="https://github.com/123456466" target="_blank" >최지선</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
