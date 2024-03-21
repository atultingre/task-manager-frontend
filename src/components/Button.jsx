const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button type={type || "button"} className={`${className} px-3 py-2 outline-none rounded-full`}>
      <span> {label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
