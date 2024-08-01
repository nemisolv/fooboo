/* eslint-disable react/no-unescaped-entities */
import { FaTimes } from 'react-icons/fa';
import Divider from '@/styles/Divider';
import NormalInput from '@/components/Form/TextInput';
import { Controller, useController, useForm } from 'react-hook-form';
import { FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/stores/slices/authSlice';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email is invalid'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  gender: Yup.string()
    .required('Please choose your sex')
    .matches(/^(Male|Female|Other)$/, 'Gender is invalid'),
});

const currentYear = new Date().getFullYear();

const currentDate = new Date();
// month start 0 -> [0-11]
const atLeast14 = new Date(1970 + 14, 0, 1);

const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const numberOfDaysOfWeek = new Date(currentYear, new Date().getMonth() + 1, 0).getDate();
const days = Array.from({ length: numberOfDaysOfWeek }, (_, i) => i + 1);

// eslint-disable-next-line react/prop-types
function Register({ setShowRegister }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {loading} = useSelector(state => state.auth)
  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: onchange,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      birthYear: currentYear,
      birthMonth: months[new Date().getMonth()],
      birthDay: new Date().getDate(),
    },
    resolver: yupResolver(schema),
  });

  const genderWatch = watch('gender');

  const onSubmit = async (data) => {
    
    const pickedDate = new Date(data.birthYear, months.indexOf(data.birthMonth), data.birthDay);
    if (currentDate - pickedDate < atLeast14) {
      setError('birthYear', {
        type: 'manual',
        message: 'You must be at least 14 years old to use Facebook',
      });
      return;
    }
    data.birthMonth = months.indexOf(data.birthMonth) + 1;
    data.birthYear = Number(data.birthYear);
    dispatch(register({ data, navigate, setShowRegister }));
  };

  return (
    <div className="modal">
      <div className="modal-content max-w-[532px]">
        <header className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <span>It's quick and easy.</span>
          </div>
          <span onClick={() => setShowRegister(false)} className="p-3 hover:opacity-60">
            <FaTimes />
          </span>
        </header>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center gap-4">
            <NormalInput name="firstName" control={control} errors={errors} placeholder="First name" hasBg />
            <NormalInput name="lastName" control={control} errors={errors} placeholder="Last name" hasBg />
          </div>
          <NormalInput
            additionalClasses="mt-2"
            name="email"
            control={control}
            errors={errors}
            placeholder="Email"
            hasBg
          />
          <NormalInput
            additionalClasses="mt-2"
            name="password"
            control={control}
            errors={errors}
            placeholder="New password"
            hasBg
            type="password"
          />
          <div>
            <label htmlFor="" className="flex items-center gap-x-2 mt-3 text-sm">
              Date of birth <FaQuestionCircle color="#8a8d91" />
            </label>
            <div className="grid grid-cols-3 gap-x-3">
              <SelectInput name="birthYear" control={control} errors={errors} options={years}></SelectInput>
              <SelectInput name="birthMonth" control={control} errors={errors} options={months}></SelectInput>
              <SelectInput name="birthDay" control={control} errors={errors} options={days}></SelectInput>
            </div>
            <label htmlFor="" className="flex items-center gap-x-2 mt-3 mb-1 text-sm">
              Gender <FaQuestionCircle color="#8a8d91" />
            </label>
            <div className="grid grid-cols-3 gap-x-3">
              <RadioInput
                type="radio"
                value="Male"
                checked={genderWatch == 'Male'}
                control={control}
                label="Male"
                name="gender"
              ></RadioInput>
              <RadioInput
                type="radio"
                value="Female"
                checked={genderWatch == 'Female'}
                control={control}
                label="Female"
                name="gender"
              ></RadioInput>
              <RadioInput
                type="radio"
                value="Other"
                checked={genderWatch == 'Other'}
                control={control}
                label="Other"
                name="gender"
              ></RadioInput>
            </div>
            {errors['gender'] && <p className="text-red-500 ml-2 text-xs mt-1">{errors['gender'].message}</p>}
          </div>
          <div className="mt-4 text-xs text-grey">
            <p>
              People who use our service may have uploaded your contact information to Facebook.{' '}
              <Link to="https://www.facebook.com/help/637205020878504" className="text-primary underline ">
                Learn more
              </Link>
            </p>
            <p className="mt-3">
              By clicking Sign Up, you agree to our{' '}
              <Link className="text-primary underline " to="https://www.facebook.com/legal/terms/update">
                Terms
              </Link>{' '}
              ,{' '}
              <Link className="" to="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                className="text-primary underline "
                to="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0"
              >
                Cookies Policy
              </Link>
              . You may receive SMS notifications from us and can opt out at any time.
            </p>
          </div>
          <div className="flex justify-center">
           
            <Button
            loading={loading}
            disabled={loading}
             className="bg-green text-white mt-4 min-w-[160px]" type='submit'
          
            >Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
function SelectInput({ label, name, control, errors, options, ...rest }) {
  return (
    <div>
      <label htmlFor={rest.id || name} className="font-semibold">
        {label}
      </label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              id={rest.id || name}
              className={`py-3 px-4 border border-gray-300 w-full rounded-md mt-1 ${errors[name] ? 'border-red-500' : ''}`}
              {...field}
              {...rest}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />
      </div>
      {errors[name] && <p className="text-red-500 ml-2 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );
}
SelectInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  control: PropTypes.object,
  errors: PropTypes.object,
  options: PropTypes.array,
};

function RadioInput({ name, control, checked, label, ...rest }) {
  const { field } = useController({ name, control });
  return (
    <div>
      <label className="py-2 px-4 border border-slate-300  rounded-md flex items-center justify-between">
        {label}
        <input type="radio" checked={checked} {...rest} {...field} value={rest.value} />
      </label>
    </div>
  );
}
RadioInput.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  checked: PropTypes.bool,
  label: PropTypes.string,
  errors: PropTypes.object,
};
