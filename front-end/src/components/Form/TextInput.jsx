import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';
import ErrorInputImg from '@/assets/images/error_input.png';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

function TextInput({ label, name, control, errors, additionalClasses, hasBg, passwordField, ...rest }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { field } = useController({ name, control });

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div>
      <label htmlFor={rest.id || name} className="font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={rest.id || name}
          name={name}
          onKeyDown={handleKeyDown}
          type={passwordField && !isPasswordVisible ? 'password' : rest.type || 'text'}
          className={`py-3   px-4 border border-gray-300 w-full
           rounded-md mt-1  ${errors[name] ? 'border-red-500' : 'focus:border-primary focus:ring-1'}  ${additionalClasses} ${hasBg ? 'bg-inputBg' : ''}
           ${passwordField && 'pr-8'}
           `}
          {...field}
          {...rest}
        />
        {passwordField && field.value.length > 0 && (
          <button onClick={togglePasswordVisibility}>
            {!isPasswordVisible ? (
              <FaEyeSlash className="absolute top-2/4 -translate-y-2/4 right-3  text-gray-500" />
            ) : (
              <FaEye className="absolute top-2/4 -translate-y-2/4 right-3  text-gray-500" />
            )}
          </button>
        )}
        {errors[name] && (
          <img src={ErrorInputImg} alt="" className="absolute top-2/4 -translate-y-[40%] right-3  w-5 h-5" />
        )}
      </div>
      {errors[name] && <p className="text-red-500 ml-2 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  control: PropTypes.object,
  errors: PropTypes.object,
  additionalClasses: PropTypes.string,
  hasBg: PropTypes.bool,
  passwordField: PropTypes.bool,
};

export default TextInput;
