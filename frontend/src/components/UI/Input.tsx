interface Props {
  placeholder: string;
  ref: React.Ref<HTMLInputElement>;
  type: string;
  name: string;
}

const Input = ({ name, placeholder, ref, type }: Props) => {
  return (
    <>
      <input
        name={name}
        placeholder={placeholder}
        ref={ref}
        type={type}
        className="text-2xl placeholder-white placeholder:opacity-50 outline-none border-b-1 border-b-[#C4A38A] p-0 w-4/5"
        autoComplete="on"
      />
    </>
  );
};

export default Input;
