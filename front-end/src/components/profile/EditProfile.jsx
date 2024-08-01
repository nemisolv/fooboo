import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NormalInput from '@/components/Form/TextInput';
import { Controller, useController } from 'react-hook-form';
import { FaPen, FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { updateProfile } from '@/stores/slices/authSlice';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string()
    .required('Please choose your sex')
    .matches(/^(Male|Female|Other)$/, 'Gender is invalid'),
    birthYear: Yup.number().required('Birth year is required').min(1905, 'Invalid birth year'),
    birthMonth: Yup.string().required('Birth month is required'),
    birthDay: Yup.number().required('Birth day is required').min(1, 'Invalid birth day').max(31, 'Invalid birth day'),
    bio: Yup.string().max(100, 'Bio must be at most 100 characters'),
    work: Yup.string().max(100, 'Work must be at most 100 characters'),
    education: Yup.string().max(100, 'Education must be at most 100 characters'),

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

export default function EditProfile() {
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: onchange,
    defaultValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      gender: currentUser?.details?.gender || '',
      birthYear: currentUser?.details?.birthYear || currentYear,
      birthMonth: currentUser?.details?.birthMonth || months[new Date().getMonth()],
      birthDay: currentUser?.details?.birthDay || new Date().getDate(),
        bio: currentUser?.details?.bio || '',
        work: currentUser?.details?.work || '',
        education: currentUser?.details?.education || '',
      
    },
    resolver: yupResolver(schema),
  });

  const genderWatch = watch('gender');

  const onSubmit = async (data) => {
    const pickedDate = new Date(data.b_year, months.indexOf(data.birthMonth), data.birthDay);
    if (currentDate - pickedDate < atLeast14) {
      setError('birthYear', {
        type: 'manual',
        message: 'You must be at least 14 years old to use Facebook',
      });
      return;
    }
    data.birthMonth = months.indexOf(data.birthMonth) + 1;
    data.birthYear = Number(data.birthYear);
    dispatch(updateProfile(data));

    console.log('data submit::', data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='flex items-center gap-3'><FaPen />Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle > Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center gap-4">
              <NormalInput name="firstName" label='First name' control={control} errors={errors} placeholder="First name" hasBg />
              <NormalInput name="lastName" control={control} errors={errors} placeholder="Last name" hasBg 
    label='Last name'

              />
            </div>
            <NormalInput
              additionalClasses="mt-2"
              name="bio"
              label={'Bio'}
              control={control}
              errors={errors}
              placeholder="ex: Software Engineer at Facebook"
              hasBg
            />
            <NormalInput additionalClasses="mt-2" name="work" control={control} errors={errors} hasBg 

            label='Work'
            />

            <NormalInput additionalClasses="mt-2" name="education" control={control} errors={errors} hasBg
            label='Education'
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

            <div className="flex justify-center">
              <Button className="bg-green text-white mt-4 min-w-[160px]" type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
