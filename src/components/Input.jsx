import cn from 'classnames'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

export const Input = ({ label, type, id, placeholder, validation }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  // Find the specific error for this input field
  const error = errors[label]

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
      </div>
      <input
        id={id}
        type={type}
        className={cn(
          "w-full p-5 font-medium border rounded-md placeholder:opacity-60",
          {
            "border-red-500": error, // Apply red border if there's an error
            "border-slate-300": !error,
          }
        )}
        placeholder={placeholder}
        {...register(label, validation)}
      />
      <AnimatePresence>
        {error && (
          <InputError message={error.message} />
        )}
      </AnimatePresence>
    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
