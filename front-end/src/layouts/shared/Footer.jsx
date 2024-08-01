import { FaPlus } from 'react-icons/fa6';

function Footer() {
  return (
    <div className=" footer min-h-[100px]  mt-8 mx-auto max-w-screen-lg pb-6 fixed bottom-0 left-0 right-0">
      <div className="flex gap-x-2 items-center  text-xs text-grey">
        <span>English (UK)</span>
        <span>Tiếng Việt</span>
        <span>中文(台灣)</span>
        <span>한국어</span>
        <span>日本語</span>
        <span>Français (France)</span>
        <span>ภาษาไทย</span>
        <span>Español</span>
        <span>Português (Brasil)</span>
        <span>Deutsch</span>
        <span className="flex items-center gap-x-2">
          <span>Italiano</span>
          <span className="px-2 py-1 border bg-gray-100 border-slate-300">
            <FaPlus color="#6a7180" />
          </span>
        </span>
      </div>

      <div className="h-[1px] w-full bg-gray-200 my-4 "></div>

      <div>
        <ul className="flex  flex-wrap gap-x-3 text-xs text-grey">
          <li>Sign Up</li>
          <li>Log In</li>
          <li>Messenger</li>
          <li>Facebook Lite</li>
          <li>Watch</li>
          <li>People</li>
          <li>Pages</li>
          <li>Page categories</li>
          <li>Places</li>
          <li>Games</li>
          <li>Locations</li>
          <li>Marketplace</li>
          <li>Facebook Pay</li>
          <li>Groups</li>
          <li>Jobs</li>
          <li>Oculus</li>
          <li>Portal</li>
          <li>Instagram</li>
          <li>Local</li>
          <li>Fundraisers</li>
          <li>Services</li>
          <li>Voting Information Center</li>
          <li>About</li>
          <li>Create ad</li>
          <li>Create Page</li>
          <li>Developers</li>
          <li>Careers</li>
          <li>Privacy</li>
          <li>Cookies</li>
          <li>AdChoices </li>
          <li>Terms</li>
          <li>Help</li>
        </ul>
        <p className="mt-5 text-xs text-grey">Meta © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Footer;
