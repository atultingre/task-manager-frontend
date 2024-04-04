const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={`${className} px-3 py-2 outline-none rounded-full`}
      onClick={onClick}
    >
      <span> {label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
